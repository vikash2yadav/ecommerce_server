const { product_variants: productVariantSchema, product_highlights: highlightSchema, product_specifications: specificationSchema, products: productSchema, partners: partnerSchema, product_variant_details: productVariantDetailSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS, STATUS_MESSAGES } = require('../Config/constant');
const { Op } = require('sequelize');

class productVariantModel {

    // --------------- admin route ----------------------

    // add productVariant
    async addProductVariant(bodyData) {
        if (bodyData) {
            for (let variants of bodyData?.variants) {
                let checkSku = await productSchema.findOne({
                    where: {
                        sku: variants?.sku,
                    }
                });

                if (checkSku) {
                    return {
                        status: STATUS_CODES?.ALREADY_REPORTED,
                        message: STATUS_MESSAGES?.EXISTS?.SKU_CODE
                    };
                }

                // create productVariant
                let createdVariantProduct = await productSchema.create({ ...variants });

                if (createdVariantProduct) {
                    for (let attribute of variants?.attributes) {
                        await productVariantSchema.create({
                            attribute_id: attribute?.attribute_id, sku: createdVariantProduct?.sku,
                            product_id: createdVariantProduct?.id, attribute_value: attribute?.attribute_value
                        });
                    }

                    await productVariantDetailSchema.create({ ...variants, product_id: createdVariantProduct?.id });

                    variants?.highlights.map(async (highlight) => {
                        await highlightSchema.create({ content: highlight?.content, product_id: createdVariantProduct?.id })
                    })

                    variants?.specifications.map(async (specification) => {
                        await specificationSchema.create({
                            specification_category_id: specification?.specification_category_id,
                            product_id: createdVariantProduct?.id, title: specification?.title, value: specification?.value
                        })
                    })
                }
            }
        }

        return {
            status: STATUS_CODES?.SUCCESS
        };
    }


    // update productVariant
    async updateProductVariant(bodyData) {

        for (let variants of bodyData?.variants) {
            let checkSku = await productSchema.findOne({
                where: {
                    sku: variants?.sku,
                    id: { [Op.ne]: variants?.id },
                }
            })

            if (checkSku) {
                return {
                    status: STATUS_CODES?.ALREADY_REPORTED,
                    message: STATUS_MESSAGES?.EXISTS?.SKU_CODE
                }
            }

            let createdVariantProduct = await productVariantSchema.update(bodyData?.variants, {
                where: {
                    id: variants?.id
                }
            })

            if (createdVariantProduct) {
                for (let attribute of variants?.attributes) {
                    await productVariantSchema.create({
                        attribute_id: attribute?.attribute_id, sku: createdVariantProduct?.sku,
                        product_id: createdVariantProduct?.id, attribute_value: attribute?.attribute_value
                    });
                }

                await productVariantDetailSchema.create({ ...variants, product_id: createdVariantProduct?.id });

                variants?.highlights.map(async (highlight) => {
                    await highlightSchema.create({ content: highlight?.content, product_id: createdVariantProduct?.id })
                })

                variants?.specifications.map(async (specification) => {
                    await specificationSchema.create({
                        specification_category_id: specification?.specification_category_id,
                        product_id: createdVariantProduct?.id, title: specification?.title, value: specification?.value
                    })
                })
            }
        }

        return {
            status: STATUS_CODES?.SUCCESS
        };

    }

    // delete productVariant
    async deleteProductVariant(id) {

        let checkProductVariant = await productSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductVariant) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get productVariant
    async getProductVariant(id) {

        // check productVariant exist or not
        let checkProductVariant = await productSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductVariant) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productSchema.findOne({
            where: {
                id: id
            },
            include: [{
                model: productVariantSchema
            },
            {
                model: productVariantDetailSchema
            }
        ]
        })
    }

    // get parent product
    async getParentProduct(id) {

        // check parent product exist or not
        let checkProduct = await productSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProduct) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get productVariant list
    async getProductVariantList(bodyData) {

        return await productVariantSchema.findAndCountAll({
            where: {
                is_delete: STATUS.NOTDELETED
            }
        });

    }

    // get productVariant by id
    async getProductVariantListByProductId(id) {

        // check productVariant exist or not
        let checkProductVariant = await productSchema.findAndCountAll({
            where: {
                parent_id: id,
                is_delete: STATUS.NOTDELETED
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