const { best_sellers: bestSellerSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS_MESSAGES, STATUS } = require('../Config/constant');
const { Op } = require('sequelize');

class bestSellerModel {

    // add best seller
    async addBestSeller(bodyData, userInfo) {

        let existData = await bestSellerSchema.findOne({
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

        // add best seller
        return await bestSellerSchema.create(bodyData);
    }

    // update best seller
    async updateBestSeller(bodyData, userInfo) {

        // check BestSeller exist or not
        let checkData = await bestSellerSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        let checkExistData = await bestSellerSchema.findOne({
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

        return await bestSellerSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete best seller
    async deleteBestSeller(id, userInfo) {

        // check best seller exist or not
        let checkData = await bestSellerSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // destroy best seller
        return await bestSellerSchema.destroy({
            where: {
                id: id,
            }
        })
    }

    // get best seller
    async getBestSeller(id, userInfo) {

        // check best seller exist or not
        let checkData = await bestSellerSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkData) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await bestSellerSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get best seller list
    async getBestSellerList(bodyData) {

        return await bestSellerSchema.findAndCountAll();

    }
}

module.exports = bestSellerModel