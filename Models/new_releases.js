const { new_release: newReleaseSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS_MESSAGES, STATUS } = require('../Config/constant');
const { Op } = require('sequelize');

class newReleaseModel {

    // add new release
    async addNewRelease(bodyData, userInfo) {

        let existData = await newReleaseSchema.findOne({
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

        // add new release
        return await newReleaseSchema.create(bodyData);
    }

    // update new release
    async updateNewRelease(bodyData, userInfo) {

        // check NewRelease exist or not
        let checkData = await newReleaseSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        let checkExistData = await newReleaseSchema.findOne({
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

        return await newReleaseSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete new release
    async deleteNewRelease(id, userInfo) {

        // check new release exist or not
        let checkData = await newReleaseSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // destroy new release
        return await newReleaseSchema.destroy({
            where: {
                id: id,
            }
        })
    }

    // get new release
    async getNewRelease(id, userInfo) {

        // check new release exist or not
        let checkData = await newReleaseSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await newReleaseSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get new release list
    async getNewReleaseList(bodyData) {

        return await newReleaseSchema.findAndCountAll();

    }
}

module.exports = newReleaseModel