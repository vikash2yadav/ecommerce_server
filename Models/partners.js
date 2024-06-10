const { STATUS_CODES, STATUS, STATUS_MESSAGES } = require('../Config/constant');
const { partners: partnerSchema, partner_tokens: partnerTokenSchema, partner_otp_verifications: partnerOtpSchema } = require("../Database/Schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const mailer = new (require('../Utils/mailer'));
const { generateOtp } = require('../Utils/helpers');
const { Op } = require('sequelize');

class partnerModel {

    // get token info
    async getPartnerTokenInfo(access_token) {
        return await partnerTokenSchema.findOne({
            where: {
                access_token: access_token,
            },
            include: [
                {
                    model: partnerSchema,
                    where: {
                        status: STATUS?.ACTIVE,
                    },
                },
            ],
        })
    }

    // add
    async add(bodyData, adminInfo) {

        // check email
        let checkEmail = await partnerSchema.findOne({
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

        return await partnerSchema.create({
            ...bodyData,
            password: hashedPassword
        });

    }

    // sign in
    async signIn(bodyData) {

        // check email
        let checkEmail = await partnerSchema.findOne({
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

        partnerTokenSchema.create({
            access_token,
            partner_id: checkEmail?.id,
            expires_at: expireTokenTime
        })

        return {
            id: checkEmail?.id,
            first_name: checkEmail?.first_name,
            last_name: checkEmail?.last_name,
            full_name: checkEmail?.full_name,
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

        let checkEmail = await partnerSchema.findOne({
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
                partner_id: id,
                expired_at: date
            }

            return await partnerOtpSchema.create(registerData);
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

        let getOtp = await partnerOtpSchema.findAll({
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

            await partnerOtpSchema.destroy({
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
                partner_id: transformedArray[0]?.partner_id
            }
        }
        return {
            status: STATUS_CODES?.NOT_FOUND
        };
    }

    // reset password
    async resetPassword(bodyData, id) {
        let checkPartner = await partnerSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkPartner) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        if (bodyData?.password !== bodyData?.confirm_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA
            }
        }

        // hashing new password
        let hashedPassword = await bcrypt.hash(bodyData?.password, 10);

        return await partnerSchema.update({ password: hashedPassword }, {
            where: {
                id,
                status: STATUS.ACTIVE,
                is_delete: STATUS.NOTDELETED
            }
        })

    }

    // sign out
    async signOut(partnerInfo, headers) {

        if (partnerInfo !== null) {
            let partner = await partnerSchema.findOne({
                where: {
                    id: partnerInfo?.id
                }
            })

            if (!partner) {
                return {
                    status: STATUS_CODES.NOT_FOUND
                }
            }

            return partnerTokenSchema.destroy({
                where: {
                    access_token: headers?.authorization
                }
            })
        } else {
            return true;
        }
    }

    // update self profile 
    async updateSelfProfile(partnerInfo, bodyData) {

        let partner = await partnerSchema.findOne({
            where: {
                id: partnerInfo?.id,
            }
        })

        if (!partner) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check already email
        let checkEmail = await partnerSchema.findOne({
            where: {
                email: bodyData?.email,
                id: { [Op.ne]: partnerInfo?.id }
            }
        })

        if (checkEmail) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.EMAIL
            }
        }

        return await partnerSchema.update(bodyData, {
            where: {
                id: partnerInfo?.id
            }
        })
    }

    // update profile 
    async updateProfile(bodyData, adminInfo) {

        let checkPartner = await partnerSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkPartner) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check already email
        let checkEmail = await partnerSchema.findOne({
            where: {
                email: bodyData?.email,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkEmail) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.EMAIL
            }
        }

        bodyData.updated_by = adminInfo?.id;

        return await partnerSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })
    }

    // partner status change
    async partnerStatusChange(bodyData, adminInfo) {

        let partner = await partnerSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!partner) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        bodyData.status_changed_by = adminInfo?.id;

        return await partnerSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete partner
    async deletePartner(id, adminInfo){
        let data = await partnerSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })
        if(!data){
            return{
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await partnerSchema.update({ is_delete: STATUS.DELETED, deleted_by: adminInfo?.id } , {
            where: {
                id: id
            }
        })

    }

    // get by id partner
    async getPartnerById(id){
        let data = await partnerSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })
        if(!data){
            return{
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return data;
    }

    // get list
    async getPartnerList(bodyData){
        return await partnerSchema.findAll({
            where: {
               is_delete: STATUS.NOTDELETED
            }
        });
    }
}

module.exports = partnerModel;
