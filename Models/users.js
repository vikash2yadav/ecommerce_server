const { STATUS_CODES, STATUS, STATUS_MESSAGES } = require('../Config/constant');
const { users: userSchema, user_tokens: userTokenSchema, user_otp_verifications: userOtpSchema } = require("../Database/Schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const mailer = new (require('../Utils/mailer'));
const { generateOtp } = require('../Utils/helpers');
const { Op } = require('sequelize');

class userModel {

    // get token info
    async getUserTokenInfo(access_token) {
        return await userTokenSchema.findOne({
            where: {
                access_token,
            },
            include: [
                {
                    model: userSchema,
                    where: {
                        status: STATUS?.ACTIVE,
                    },
                },
            ],
        })
    }

    // sign up
    async signUp(bodyData) {

        // check email
        let checkEmail = await userSchema.findOne({
            where: {
                email: bodyData?.email
            }
        })

        if (checkEmail) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.EMAIL
            }
        }

        let hashedPassword = await bcrypt.hash(bodyData?.password, 10);

        return await userSchema.create({
            ...bodyData,
            password: hashedPassword
        })

    }

    // sign in
    async signIn(bodyData) {

        // check email
        let checkEmail = await userSchema.findOne({
            where: {
                email: bodyData?.email,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkEmail) {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.NOT_FOUND.EMAIL
            }
        }

        if (checkEmail.status == STATUS.INACTIVE) {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.USER.INACTIVE
            }
        }

        let match_password = await bcrypt.compare(
            bodyData?.password,
            checkEmail?.password
        );

        if (!match_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA
            }
        }

        // generate token
        let access_token = await jwt.sign({ email: checkEmail?.email }, process.env.SECRET_KEY)

        // get expires time
        let currentDate = moment();
        let expireTokenTime = await moment(currentDate).add(48, 'hours');

        userTokenSchema.create({
            access_token,
            user_id: checkEmail?.id,
            expires_at: expireTokenTime
        })

        return {
            id: checkEmail?.id,
            first_name: checkEmail?.first_name,
            last_name: checkEmail?.last_name,
            full_name: checkEmail?.full_name,
            username: checkEmail?.username,
            email: checkEmail?.email,
            profile_image: checkEmail?.profile_image,
            country_code: checkEmail?.country_code,
            contact_no: checkEmail?.contact_no,
            gender: checkEmail?.gender,
            birth_date: checkEmail?.birth_date,
            address: checkEmail?.address,
            status: checkEmail?.status,
            is_delete: checkEmail?.is_delete,
            access_token,
        };
    }

    // forgot password
    async forgotPassword(data) {

        let email = data?.email;

        let checkEmail = await userSchema.findOne({
            where: {
                email: email,
                status: STATUS?.ACTIVE,
                is_delete: STATUS?.NOTDELETED
            }
        });

        if (checkEmail) {

            let id = checkEmail?.id;

            let otp = await generateOtp();
            let hashedOtp = await bcrypt.hash(otp, 10);

            const emailOtp = {
                email: email,
                otp: otp,
            }

            await mailer.forgotPasswordEmail(emailOtp);

            let date = new Date();
            date.setMinutes(date.getMinutes() + 2);

            let registerData = {
                otp: hashedOtp,
                user_id: id,
                expired_at: date
            }

            return await userOtpSchema.create(registerData);
        }
        else {
            return {
                status: STATUS_CODES.NOT_FOUND
            };
        }
    }

    // otp verification
    async otpVerificationByOtp(data) {

        var otp = data?.otp;
        var date = new Date();

        let getOtp = await userOtpSchema.findAll({
            order: [['createdAt', 'DESC']]
        })

        let transformedArray = [];
        for (const item of getOtp) {
            let compareOTP = await bcrypt.compare(otp, item?.otp)
            if (compareOTP === true) {
                transformedArray.push(item);
                break;
            }
            else {
                return {
                    status: STATUS_CODES?.NOT_FOUND
                };
            }
        }

        if (transformedArray?.length > 0) {
            let oldOtp = transformedArray[0]?.otp;

            let oldDate = transformedArray[0]?.expired_at;

            await userOtpSchema.destroy({
                where: {
                    otp: oldOtp
                }
            });

            if (date > oldDate) {

                return {
                    status: STATUS_CODES?.NOT_ACCEPTABLE
                }
            }

            return {
                user_id: transformedArray[0]?.user_id
            }
        }
        return {
            status: STATUS_CODES?.NOT_FOUND
        };
    }

    // reset password
    async resetPassword(bodyData, id) {

        if (bodyData?.password !== bodyData?.confirm_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA
            }
        }

        // hashing new password
        let hashedPassword = await bcrypt.hash(bodyData?.password, 10);

        return await userSchema.update({ password: hashedPassword }, {
            where: {
                id,
                status: STATUS.ACTIVE,
                is_delete: STATUS.NOTDELETED
            }
        })

    }

    // change password 
    async changePassword(bodyData, userInfo) {
        let { old_password, new_password, confirm_password } = bodyData;

        // check email
        let checkEmail = await userSchema.findOne({
            where: {
                id: userInfo?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        let match_password = await bcrypt.compare(
            old_password,
            checkEmail?.password
        );

        if (!match_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
                message: STATUS_MESSAGES.OLD_PASSWORD.WRONG
            }
        }

        if (new_password !== confirm_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
                message: STATUS_MESSAGES.PASSWORD.NOT_SAME
            }
        }
        
        let hashedPassword = await bcrypt.hash(new_password, 10);

        return await userSchema.update({password: hashedPassword}, {
            where: {
                id: userInfo?.id
            }
        })
    }

    // sign out
    async signOut(userInfo, headers) {

        if (userInfo !== null) {
            let user = await userSchema.findOne({
                where: {
                    id: userInfo?.id
                }
            })

            if (!user) {
                return {
                    status: STATUS_CODES.NOT_FOUND
                }
            }

            return userTokenSchema.destroy({
                where: {
                    access_token: headers?.authorization
                }
            })
        } else {
            return true;
        }
    }

    // update self profile 
    async updateSelfProfile(userInfo, bodyData) {

        let user = await userSchema.findOne({
            where: {
                id: userInfo?.id,
            }
        })

        if (!user) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check already email
        let checkEmail = await userSchema.findOne({
            where: {
                email: bodyData?.email,
                id: { [Op.ne]: userInfo?.id }
            }
        })

        if (checkEmail) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.EMAIL
            }
        }

        return await userSchema.update(bodyData, {
            where: {
                id: userInfo?.id
            }
        })
    }

    // user status change 
    async userStatusChange(adminInfo, bodyData) {
        let user = await userSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!user) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        bodyData.status_changed_by = adminInfo?.id;

        return await userSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // add user
    async addUser(adminInfo, bodyData) {
        // check email
        let checkEmail = await userSchema.findOne({
            where: {
                email: bodyData?.email
            }
        })

        if (checkEmail) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.EMAIL
            }
        }

        let hashedPassword = await bcrypt.hash(bodyData?.password, 10);
        bodyData.created_by = adminInfo?.id;

        return await userSchema.create({
            ...bodyData,
            password: hashedPassword
        });

    }

    // update user 
    async updateUser(adminInfo, bodyData) {

        let checUser = await userSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checUser) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check already email
        let checkEmail = await userSchema.findOne({
            where: {
                email: bodyData?.email,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkEmail) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            }
        }

        bodyData.updated_by = adminInfo?.id;

        return await userSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })
    }

    // delete user 
    async deleteUser(adminInfo, id) {

        let user = await userSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!user) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await userSchema.update({ is_delete: STATUS.DELETED, deleted_by: adminInfo?.id }, {
            where: {
                id: id
            }
        })

    }

    // get user by id
    async getUserById(id) {
        let data = await userSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })
        if (!data) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return data;
    }

    // list user
    async getUserList() {

        return await userSchema.findAll({
            where: {
                is_delete: STATUS.NOTDELETED
            }
        })

    }
}

module.exports = userModel;
