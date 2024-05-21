const { languages: languageSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS_MESSAGES, STATUS } = require('../Config/constant');
const { Op } = require('sequelize');

class languageModel {

    // add language
    async addLanguage(bodyData, userInfo) {

        let existLanguage = await languageSchema.findOne({
            where: {
                name: bodyData?.name,
                code: bodyData?.code,
            }
        });

        if (existLanguage) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // add language
        return await languageSchema.create(bodyData);
    }

    // update language
    async updateLanguage(bodyData, userInfo) {

        // check language exist or not
        let checkLanguage = await languageSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkLanguage) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        let checkExistLanguageName = await languageSchema.findOne({
            where: {
                name: bodyData?.name,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkExistLanguageName) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.LANGUAGE
            }
        }

        let checkExistLanguageCode = await languageSchema.findOne({
            where: {
                code: bodyData?.code,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkExistLanguageCode) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.LANGUAGE_CODE
            }
        }

        return await languageSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete language
    async deleteLanguage(id, userInfo) {

        // check language exist or not
        let checkLanguage = await languageSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkLanguage) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // delete language
        return await languageSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id,
            }
        })
    }

    // get language
    async getLanguage(id, userInfo) {

        // check language exist or not
        let checkLanguage = await languageSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkLanguage) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await languageSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get language list
    async getLanguageList(bodyData) {

        return await languageSchema.findAndCountAll();

    }
}

module.exports = languageModel