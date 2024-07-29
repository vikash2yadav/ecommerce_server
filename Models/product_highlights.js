const { product_highlights: productHighLightSchema, admins: adminSchema, products: productSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class productHighLightModel {

    // ---------------- admin route -----------------

    // add product high light
    async addProductHighLight(bodyData, adminInfo) {
        return await productHighLightSchema.create(bodyData);
    }

    // update product high light
    async updateProductHighLight(bodyData, adminInfo) {

        // check product high light exist or not
        let checkProductHighlight = await productHighLightSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkProductHighlight) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

           return await productHighLightSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // product high light status change
    async productHighLightStatusChange(adminInfo, bodyData) {

        let checkProductHighlight = await productHighLightSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkProductHighlight) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }


        return await productHighLightSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete product high light
    async deleteProductHighLight(id, adminInfo) {

        // check product high light exist or not
        let checkProductHighlight = await productHighLightSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkProductHighlight) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productHighLightSchema.destroy({
            where: {
                id: id
            }
        })
    }

    // get product high light
    async getProductHighLightById(id) {

        // check product high light exist or not
        let checkProductHighlight = await productHighLightSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkProductHighlight) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productHighLightSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get product high light list
    async getProductHighLightList(id) {

        return await productHighLightSchema.findAndCountAll({
            where: {
                product_id: id
            }
        });
    }

}

module.exports = productHighLightModel