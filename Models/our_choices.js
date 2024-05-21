const { our_choices: ourChoiceSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS_MESSAGES, STATUS } = require('../Config/constant');
const { Op } = require('sequelize');

class ourChoiceModel {

    // add our choice
    async addOurChoice(bodyData, userInfo) {

        let existData = await ourChoiceSchema.findOne({
            where: {
                category_id: bodyData?.category_id,
                product_id: bodyData?.product_id,
            }
        });

        if (existData) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // add our choice
        return await ourChoiceSchema.create(bodyData);
    }

    // update our choice
    async updateOurChoice(bodyData, userInfo) {

        // check NewRelease exist or not
        let checkData = await ourChoiceSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        let checkExistData = await ourChoiceSchema.findOne({
            where: {
                category_id: bodyData?.category_id,
                product_id: bodyData?.product_id,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkExistData) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            }
        }

        return await ourChoiceSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete our choice
    async deleteOurChoice(id, userInfo) {

        // check our choice exist or not
        let checkData = await ourChoiceSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // destroy our choice
        return await ourChoiceSchema.destroy({
            where: {
                id: id,
            }
        })
    }

    // get our choice
    async getOurChoice(id, userInfo) {

        // check our choice exist or not
        let checkData = await ourChoiceSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await ourChoiceSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get our choice list
    async getOurChoiceList(bodyData) {

        return await ourChoiceSchema.findAndCountAll();

    }
}

module.exports = ourChoiceModel