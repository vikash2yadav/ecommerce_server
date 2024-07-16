const { STATUS_CODES, STATUS, STATUS_MESSAGES, ROLE } = require('../Config/constant');
const { partners: partnerSchema, partner_tokens: partnerTokenSchema,languages: languageSchema, admins: adminSchema, partner_otp_verifications: partnerOtpSchema } = require("../Database/Schema");
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


    // ----------------- admin -------------------

     // add
     async addVendor(bodyData, adminInfo) {

        // check email
        let checkEmail = await partnerSchema.findOne({
            where: {
                email: bodyData?.email,
                role_id: ROLE?.VENDOR
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
        bodyData.role_id = ROLE?.VENDOR;

        return await partnerSchema.create({
            ...bodyData,
            password: hashedPassword
        });

    }

    // add
    async addDeliveryPartner(bodyData, adminInfo) {

        // check email
        let checkEmail = await partnerSchema.findOne({
            where: {
                email: bodyData?.email,
                role_id: ROLE?.DELIVERY_PARTNER
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
        bodyData.role_id = ROLE?.DELIVERY_PARTNER;

        return await partnerSchema.create({
            ...bodyData,
            password: hashedPassword
        });

    }

    // update vendor 
    async vendorUpdate(bodyData, adminInfo) {

        let checkVendor = await partnerSchema.findOne({
            where: {
                id: bodyData?.id,
                role_id: ROLE.VENDOR,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkVendor) {
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

    // update delivery partner 
    async deliveryPartnerUpdate(bodyData, adminInfo) {

        let checkDeliveryPartner = await partnerSchema.findOne({
            where: {
                id: bodyData?.id,
                role_id: ROLE.DELIVERY_PARTNER,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkDeliveryPartner) {
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

    // vendor status change
    async vendorStatusChange(bodyData, adminInfo) {

        let vendor = await partnerSchema.findOne({
            where: {
                id: bodyData?.id,
                role_id: ROLE.VENDOR,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!vendor) {
            return {
                status: STATUS_CODES.NOT_FOUND
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
                role_id: ROLE.DELIVERY_PARTNER,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!partner) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        bodyData.updated_by = adminInfo?.id;

        return await partnerSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete vendor
    async deleteVendor(id, adminInfo) {

        let vendor = await partnerSchema.findOne({
            where: {
                id: id,
                role_id: ROLE.VENDOR,
                is_delete: STATUS.NOTDELETED
            }
        })
        if (!vendor) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await partnerSchema.update({ is_delete: STATUS.DELETED, updated_by: adminInfo?.id }, {
            where: {
                id: id
            }
        })

    }

    // delete partner
    async deletePartner(id, adminInfo) {

        let partner = await partnerSchema.findOne({
            where: {
                id: id,
                role_id: ROLE.DELIVERY_PARTNER,
                is_delete: STATUS.NOTDELETED
            }
        })
        if (!partner) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await partnerSchema.update({ is_delete: STATUS.DELETED, updated_by: adminInfo?.id }, {
            where: {
                id: id
            }
        })

    }

     // get by id vendor
     async getVendorById(id) {
        let data = await partnerSchema.findOne({
            where: {
                id: id,
                role_id: ROLE.VENDOR,
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

    // get by id partner
    async getPartnerById(id) {
        let data = await partnerSchema.findOne({
            where: {
                id: id,
                role_id: ROLE.DELIVERY_PARTNER,
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

    // get list
    async getVendorList(bodyData) {
        var currentPage,itemsPerPage,lastRecordIndex,firstRecordIndex;
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

        var filterQuery = {}, createdByQuery = {}, updatedByQuery = {}, languageQuery={};
        if (bodyData?.filters && bodyData.filters.length > 0) {
            bodyData.filters.forEach((filter) => {
                if (filter.id != "" && filter.value != "") {
                    if (typeof (filter.value) === 'string') {
                         if (filter.id === 'language.name') {
                            languageQuery["name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        }else if (filter.id === 'partnerCreatedBy.full_name') {
                            createdByQuery["full_name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        } else if (filter.id === 'partnerUpdatedBy.full_name') {
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
        if (Object.keys(createdByQuery).length > 0) {
            includeConditions.push({
                model: adminSchema,
                as: 'partnerCreatedBy',
                where: createdByQuery,
            });
        } else {
            includeConditions.push({
                model: adminSchema,
                as: 'partnerCreatedBy',
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
                as: 'partnerUpdatedBy',
                where: updatedByQuery,
            });
        } else {
            includeConditions.push({
                model: adminSchema,
                as: 'partnerUpdatedBy',
            });
        }

        return await partnerSchema.findAndCountAll({
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

    // get list
    async getDeliveryPartnerList(bodyData) {

       var currentPage,itemsPerPage,lastRecordIndex,firstRecordIndex;
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

        var filterQuery = {}, createdByQuery = {}, updatedByQuery = {}, languageQuery={};
        if (bodyData?.filters && bodyData.filters.length > 0) {
            bodyData.filters.forEach((filter) => {
                if (filter.id != "" && filter.value != "") {
                    if (typeof (filter.value) === 'string') {
                         if (filter.id === 'language.name') {
                            languageQuery["name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        }else if (filter.id === 'partnerCreatedBy.full_name') {
                            createdByQuery["full_name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        } else if (filter.id === 'partnerUpdatedBy.full_name') {
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
        if (Object.keys(createdByQuery).length > 0) {
            includeConditions.push({
                model: adminSchema,
                as: 'partnerCreatedBy',
                where: createdByQuery,
            });
        } else {
            includeConditions.push({
                model: adminSchema,
                as: 'partnerCreatedBy',
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
                as: 'partnerUpdatedBy',
                where: updatedByQuery,
            });
        } else {
            includeConditions.push({
                model: adminSchema,
                as: 'partnerUpdatedBy',
            });
        }

        return await partnerSchema.findAndCountAll({
            where:{
                is_delete: STATUS.NOTDELETED,
                role_id: ROLE.DELIVERY_PARTNER,
                ...filterQuery
            },
            include: includeConditions,
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: sortBy,
        })
    }
   

}

module.exports = partnerModel;
