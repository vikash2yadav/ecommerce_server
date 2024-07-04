const { product_variants: productVariantSchema, products: productSchema, partners: partnerSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS, STATUS_MESSAGES } = require('../Config/constant');
const { Op } = require('sequelize');

class productVariantModel {

    // --------------- admin route ----------------------

    // add productVariant
    async addProductVariant(bodyData) {

        // create productVariant
        return await productVariantSchema.create(bodyData);
    }

    // update productVariant
    async updateProductVariant(bodyData) {

        return await productVariantSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete productVariant
    async deleteProductVariant(id) {

        let checkProductVariant = await productVariantSchema.findOne({
            where: {
                id: id,
            }
        })

        if (!checkProductVariant) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productVariantSchema.destroy({
            where: {
                id: id
            }
        })
    }

    // get productVariant
    async getProductVariant(id) {

        // check productVariant exist or not
        let checkProductVariant = await productVariantSchema.findOne({
            where: {
                id: id,
            }
        })

        if (!checkProductVariant) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productVariantSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get productVariant list
    async getProductVariantList(bodyData) {

        return await productVariantSchema.findAndCountAll();

    }


    // ---------------- vendor product variant -------------------

    // get productVariant list
    async getVendorProductVariantList(bodyData) {

        return await productVariantSchema.findAndCountAll({
                include: [{
                    model: productSchema,
                    where: {
                        vendor_id: 1,       
                    }
                }]
        });

    }

}

module.exports = productVariantModel