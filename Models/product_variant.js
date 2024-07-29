const { product_variants: productVariantSchema, products: productSchema, partners: partnerSchema, product_variant_details: productVariantDetailSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS, STATUS_MESSAGES } = require('../Config/constant');
const { Op } = require('sequelize');

class productVariantModel {

    // --------------- admin route ----------------------

    // add productVariant
    async addProductVariant(bodyData) {

        let checkSku = await productVariantSchema.findOne({
            where: {
                sku: bodyData?.sku
            }
        })

        if (checkSku) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED,
                message: STATUS_MESSAGES?.EXISTS?.SKU_CODE
            }
        }

        // create productVariant
        return await productVariantSchema.create(bodyData);
    }

    // update productVariant
    async updateProductVariant(bodyData) {

        let checkSku = await productSchema.findOne({
            where: {
                sku: bodyData?.sku,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkSku) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED,
                message: STATUS_MESSAGES?.EXISTS?.SKU_CODE
            }
        }

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
                id: id
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
            }, 
            include: {
                model: productSchema
            }
        })
    }

    // get productVariant list
    async getProductVariantList(bodyData) {

        return await productVariantSchema.findAndCountAll();

    }

    // get productVariant by id
    async getProductVariantListByProductId(id) {

        // check productVariant exist or not
        let checkProductVariant = await productSchema.findAndCountAll({
            where: {
                parent_id: id,
            },
            include: [{
                model: productVariantSchema
            },
            {
                model: productVariantDetailSchema
            }
        ]
        })


        if (!checkProductVariant) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return checkProductVariant
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