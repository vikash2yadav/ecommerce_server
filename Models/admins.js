const { STATUS_CODES, STATUS, STATUS_MESSAGES } = require('../Config/constant');
const { admins: adminSchema, admin_tokens: adminTokenSchema, languages: languageSchema, admin_otp_verifications: adminOtpSchema, roles: roleSchema } = require("../Database/Schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const mailer = new (require('../Utils/mailer'));
const { generateOtp } = require('../Utils/helpers');
const { Op } = require('sequelize');

class adminModel {

    // get token info
    async getAdminTokenInfo(access_token) {
        return await adminTokenSchema.findOne({
            where: {
                access_token,
            },
            include: [
                {
                    model: adminSchema,
                    where: {
                        status: STATUS?.ACTIVE,
                    },
                },
            ],
        })
    }

    // add admin
    async add(bodyData, adminInfo) {
        // check email
        let checkEmail = await adminSchema.findOne({
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

        bodyData.created_by = adminInfo?.id;
        let hashedPassword = await bcrypt.hash(bodyData?.password, 10);

        return await adminSchema.create({
            ...bodyData,
            password: hashedPassword
        });

    }

    // sign in
    async signIn(bodyData) {

        // check email
        let checkEmail = await adminSchema.findOne({
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
                message: STATUS_MESSAGES.ADMIN.INACTIVE
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

        adminTokenSchema.create({
            access_token,
            admin_id: checkEmail?.id,
            expires_at: expireTokenTime
        });

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
    async forgotPassword(bodyData) {

        let email = bodyData?.email;

        let checkEmail = await adminSchema.findOne({
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
                admin_id: id,
                expired_at: date
            }

            return await adminOtpSchema.create(registerData);
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

        let getOtp = await adminOtpSchema.findAll({
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

            await adminOtpSchema.destroy({
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
                admin_id: transformedArray[0]?.admin_id
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

        return await adminSchema.update({ password: hashedPassword }, {
            where: {
                id: id,
                status: STATUS.ACTIVE,
                is_delete: STATUS.NOTDELETED
            }
        })

    }

    // sign out
    async signOut(adminInfo, headers) {

        if (adminInfo !== null) {
            let admin = await adminSchema.findOne({
                where: {
                    id: adminInfo?.id
                }
            })

            if (!admin) {
                return {
                    status: STATUS_CODES.NOT_FOUND
                }
            }

            return adminTokenSchema.destroy({
                where: {
                    access_token: headers?.authorization
                }
            })
        } else {
            return true;
        }
    }

    // update self profile 
    async updateSelfProfile(adminInfo, bodyData) {

        let admin = await adminSchema.findOne({
            where: {
                id: adminInfo?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!admin) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check already email
        let checkEmail = await adminSchema.findOne({
            where: {
                email: bodyData?.email,
                id: { [Op.ne]: adminInfo?.id }
            }
        })

        if (checkEmail) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.EMAIL
            }
        }

        return await adminSchema.update(bodyData, {
            where: {
                id: adminInfo?.id
            }
        })
    }

    // update profile 
    async updateProfile(adminInfo, bodyData) {

        let checkAdmin = await adminSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkAdmin) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check already email
        let checkEmail = await adminSchema.findOne({
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

        return await adminSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })
    }

    // admin status change
    async adminStatusChange(adminInfo, bodyData) {

        let admin = await adminSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!admin) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        bodyData.updated_by = adminInfo?.id;

        return await adminSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete admin 
    async deleteAdmin(adminInfo, id) {

        let admin = await adminSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!admin) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await adminSchema.update({ is_delete: STATUS.DELETED, updated_by: adminInfo?.id }, {
            where: {
                id: id
            }
        })

    }

    
    // get by id
    async getAdminById(id){
        let data = await adminSchema.findOne({
            where:{
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })
        if(!data){
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return data;
    }

    // get self profile data
    async getSelfProfileData(adminInfo){
        let data = await adminSchema.findOne({
            where:{
                id: adminInfo?.id,
                is_delete: STATUS.NOTDELETED
            }
        })
        if(!data){
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return data;
    }



      // list
      async getAdminList(bodyData){
        var currentPage = null,itemsPerPage,lastRecordIndex,firstRecordIndex;
        if (bodyData?.currentPage && bodyData?.itemsPerPage) {
            currentPage = bodyData.currentPage;
            itemsPerPage = bodyData.itemsPerPage;
            lastRecordIndex = currentPage * itemsPerPage;
            firstRecordIndex = lastRecordIndex - itemsPerPage;
        }

        var sortBy = [];
        if (bodyData?.sortBy && bodyData.sortBy.length > 0) {
            bodyData.sortBy.forEach((sort) => {
                if (sort.id !== "" && sort.desc !== "") {
                    if (sort?.desc === true) {
                        sortBy.push([sort.id, 'desc'])
                    }else{
                        sortBy.push([sort.id, 'asc'])
                    }
                }
            });
        }
        if (sortBy.length < 1) {
            sortBy = [['id', 'desc']];
        }

        var filterQuery = {}, roleQuery = {}, createdByQuery = {}, updatedByQuery = {}, languageQuery={};
        if (bodyData?.filters && bodyData.filters.length > 0) {
            bodyData.filters.forEach((filter) => {
                if (filter.id != "" && filter.value != "") {
                    if (typeof (filter.value) === 'string') {
                        if (filter.id === 'role.name') {
                            roleQuery["name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        }else if (filter.id === 'language.name') {
                            languageQuery["name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        }else if (filter.id === 'adminCreatedBy.full_name') {
                            createdByQuery["full_name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        } else if (filter.id === 'adminUpdatedBy.full_name') {
                            updatedByQuery["full_name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        } else if (filter.id === 'status') {
                            if (filter?.value === '2') {
                                filterQuery;
                            } else {
                                filterQuery[filter.id] = {
                                    [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                                };
                            }
                        }
                        else {
                            filterQuery[filter.id] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        }
                    }
                }
            });
        }

        const includeConditions = [];
        if (Object.keys(roleQuery).length > 0) {
            includeConditions.push({
                model: roleSchema,
                where: roleQuery,
                attributes: ["name"],
            });
        } else {
            includeConditions.push({
                model: roleSchema,
                attributes: ["name"],
            });
        }

        if (Object.keys(createdByQuery).length > 0) {
            includeConditions.push({
                model: adminSchema,
                as: 'adminCreatedBy',
                where: createdByQuery,
            });
        } else {
            includeConditions.push({
                model: adminSchema,
                as: 'adminCreatedBy',
            });
        }

        if (Object.keys(languageQuery).length > 0) {
            includeConditions.push({
                model: languageSchema,
                where: languageQuery,
                 attributes: ["name"],
            });
        } else {
            includeConditions.push({
                model: languageSchema,
                 attributes: ["name"],
            });
        }

        if (Object.keys(updatedByQuery).length > 0) {
            includeConditions.push({
                model: adminSchema,
                as: 'adminUpdatedBy',
                where: updatedByQuery,
            });
        } else {
            includeConditions.push({
                model: adminSchema,
                as: 'adminUpdatedBy',
            });
        }

        return await adminSchema.findAndCountAll({
            where:{
                is_delete: STATUS.NOTDELETED,
                ...filterQuery
            },
            include: includeConditions,
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: sortBy,
        })
    }


     // change password 
     async changePassword(adminInfo, bodyData) {

        let { old_password, new_password, confirm_password } = bodyData;

        // check email
        let checkEmail = await adminSchema.findOne({
            where: {
                id: adminInfo?.id,
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

        if (new_password === old_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
                message: STATUS_MESSAGES.PASSWORD.SAME_AS_OLD_PASSWORD
            }
        }

        let hashedPassword = await bcrypt.hash(new_password, 10);

        return await adminSchema.update({ password: hashedPassword }, {
            where: {
                id: adminInfo?.id
            }
        })
    }


}

module.exports = adminModel;
