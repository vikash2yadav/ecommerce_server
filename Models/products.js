const { products: productSchema, product_variant_details: productVariantDetailSchema, product_variants: productVariantSchema, categories: categorySchema, partners: partnerSchema, attributes: attributeSchema, attribute_values: attributeValueSchema, admins: adminSchema, Sequelize } = require('../Database/Schema');
const { STATUS_CODES, STATUS, STATUS_MESSAGES } = require('../Config/constant');
const { Op } = require('sequelize');

class productModel {

    // add product
    async addProduct(bodyData) {

        let checkSku = await productSchema.findOne({
            where: {
                sku: bodyData?.sku
            }
        });

        if (checkSku) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED,
                message: STATUS_MESSAGES?.EXISTS?.SKU_CODE
            };
        }

        let parentProduct = await productSchema.create(bodyData);
        await productVariantDetailSchema.create(bodyData);

        if (bodyData?.variants && parentProduct) {
            for (let item of bodyData.variants) {
                let checkSku = await productSchema.findOne({
                    where: {
                        sku: item?.sku
                    }
                });

                if (checkSku) {
                    await productVariantDetailSchema.destroy({
                        where: {
                            sku: parentProduct?.sku
                        }
                    })
                    await productSchema.destroy({
                        where: {
                            id: parentProduct?.id
                        }
                    })
                    return {
                        status: STATUS_CODES?.ALREADY_REPORTED,
                        message: STATUS_MESSAGES?.EXISTS?.PRODUCT_VARIANT_SKU_CODE
                    };
                }

                let createdProduct = await productSchema.create({ ...item,vendor_id: parentProduct?.vendor_id, category_id: parentProduct?.category_id, parent_id: parentProduct?.id });

                if (createdProduct) {
                    for (let items of item.attributes) {
                        await productVariantSchema.create({
                            sku: item?.sku,
                            attribute_id: items?.attribute_id,
                            attribute_value: items?.attribute_value,
                            product_id: createdProduct?.id
                        });
                    }
                }

                await productVariantDetailSchema.create({
                    strike_price: item?.strike_price,
                    price: item?.price,
                    stock: item?.stock,
                    sku: item?.sku
                });
            }
            return { status: 200, message: STATUS_MESSAGES.PRODUCT.ADDED };
        }else{
            return {status : STATUS_CODES.SUCCESS, message: STATUS_MESSAGES.PRODUCT.ADDED}
        }
    }


    // update product
    async updateProduct(id, bodyData, adminInfo) {

    let checkProduct = await productSchema.findOne({
        where: {
            id: id,
            is_delete: STATUS.NOTDELETED
        }
    });

    if (!checkProduct) {
        return {
            status: STATUS_CODES?.NOT_FOUND,
            message: STATUS_MESSAGES?.NOT_FOUND?.PRODUCT
        };
    }

    let checkSku = await productSchema.findOne({
        where: {
            sku: bodyData?.sku,
            id: { [Op.ne]: item?.id }
        }
    })

    if (checkSku) {
        return {
            status: STATUS_CODES?.ALREADY_REPORTED,
            message: STATUS_MESSAGES?.EXISTS?.SKU_CODE
        }
    }else{
        await productVariantSchema.destroy({
            where: {
                product_id: id
            }
        })
        await productSchema.destroy({
            where: {
                id: id
            }
        })
        await productVariantDetailSchema.destroy({
            where: {
                sku: checkProduct?.sku
            }
        })
    }
    
    bodyData.last_updated_by = adminInfo?.id;
    let parentProduct = await productSchema.create(bodyData);

    await productVariantDetailSchema.create(bodyData);

    if (bodyData?.variants && parentProduct) {
        for (let item of bodyData.variants) {

            let checkSku = await productSchema.findOne({
                where: {
                    sku: item?.sku,
                    id: { [Op.ne]: item?.id }
                }
            })

            if (checkSku) {
                await productVariantDetailSchema.destroy({
                    where: {
                        sku: parentProduct?.sku
                    }
                })
                await productSchema.destroy({
                    where: {
                        id: parentProduct?.id
                    }
                })
                return {
                    status: STATUS_CODES?.ALREADY_REPORTED,
                    message: STATUS_MESSAGES?.EXISTS?.PRODUCT_VARIANT_SKU_CODE
                }
            }

            item.last_updated_by = adminInfo?.id;
            let createdProduct = await productSchema.create({ ...item, vendor_id: parentProduct?.vendor_id, category_id: parentProduct?.category_id, parent_id: parentProduct?.id});

            if (createdProduct) {
                for (let items of item.attributes) {
                    let createdVariant = await productVariantSchema.create({
                        sku: item?.sku,
                        attribute_id: items?.attribute_id,
                        attribute_value: items?.attribute_value,
                        product_id: createdProduct?.id
                    });

                    if (!createdVariant && createdProduct) {
                        await productVariantSchema.destroy({
                            where: {
                                product_id: createdProduct?.id
                            }
                        })
                        await productSchema.destroy({
                            where: {
                                id: createdProduct?.id
                            }
                        })
                        return {
                            status: STATUS_CODES.NOT_ACCEPTABLE,
                            message: STATUS_MESSAGES.PRODUCT.TRY_AGAIN
                        }
                    }
                }
            }

            await productVariantDetailSchema.create({
                strike_price: item?.strike_price,
                price: item?.price,
                stock: item?.stock,
                sku: item?.sku
            });
        }
        return { status: STATUS_CODES.SUCCESS, message: STATUS_MESSAGES.PRODUCT.UPDATED };
    }
    else {
        return {status : STATUS_CODES.SUCCESS, message: STATUS_MESSAGES.PRODUCT.UPDATED}
    }
}


    // product status change
    async productStatusChange(adminInfo, bodyData) {

    let product = await productSchema.findOne({
        where: {
            id: bodyData?.id,
            is_delete: STATUS.NOTDELETED
        }
    })

    if (!product) {
        return {
            status: STATUS_CODES.NOT_FOUND
        }
    }

    bodyData.last_updated_by = adminInfo?.id;

    return await productSchema.update(bodyData, {
        where: {
            id: bodyData?.id
        }
    })

}

    // delete product
    async deleteProduct(id, adminInfo) {

    // check product exist or not
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


    return await productSchema.update({ is_delete: STATUS.DELETED, last_updated_by: adminInfo?.id }, {
        where: {
            id: id
        }
    })
}

    // get product
    async getProduct(id) {

    // check product exist or not
    let checkProduct = await productSchema.findOne({
        where: {
            id: id,
            is_delete: STATUS.NOTDELETED
        },
        include:
            [
                {
                    model: productSchema,
                    as: 'parent_product',
                    attributes: ['name', 'sku']
                },
                {
                    model: productVariantSchema,
                    include: [
                        {
                            model: attributeSchema
                        }
                    ]
                },
            ]
    })

    if (!checkProduct) {
        return {
            status: STATUS_CODES.NOT_FOUND
        }
    }

    return checkProduct;
}

    // get product list
    async getProductList(bodyData) {
    var currentPage, itemsPerPage, lastRecordIndex, firstRecordIndex;
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
                } else {
                    sortBy.push([sort.id, 'asc'])
                }
            }
        });
    }
    if (sortBy.length < 1) {
        sortBy = [['id', 'desc']];
    }

    var filterQuery = {}, partnerQuery = {}, categoryQuery = {}, adminQuery = {};
    if (bodyData?.filters && bodyData.filters.length > 0) {
        bodyData.filters.forEach((filter) => {
            if (filter.id != "" && filter.value != "") {
                if (typeof (filter.value) === 'string') {
                    if (filter.id === 'partner.full_name') {
                        partnerQuery["full_name"] = {
                            [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                        };
                    } else if (filter.id === 'category.name') {
                        categoryQuery["name"] = {
                            [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                        };
                    } else if (filter.id === 'last_updated_by.full_name') {
                        adminQuery["full_name"] = {
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
    if (Object.keys(partnerQuery).length > 0) {
        includeConditions.push({
            model: partnerSchema,
            where: partnerQuery,
        });
    } else {
        includeConditions.push({
            model: partnerSchema,
        });
    }

    if (Object.keys(categoryQuery).length > 0) {
        includeConditions.push({
            model: categorySchema,
            where: categoryQuery,
            attributes: ["name"],
        });
    } else {
        includeConditions.push({
            model: categorySchema,
            attributes: ["name"],
        });
    }

    if (Object.keys(adminQuery).length > 0) {
        includeConditions.push({
            model: adminSchema,
            where: adminQuery,
        });
    } else {
        includeConditions.push({
            model: adminSchema,
        });
    }

    includeConditions.push({
        model: productVariantSchema
    })

    includeConditions.push({
        model: productSchema,
        as: 'parent_product',
        attributes: ['name', 'sku']
    })

    return await productSchema.findAndCountAll({
        where: {
            is_delete: STATUS.NOTDELETED,
            parent_id: null,
            ...filterQuery
        },
        include: includeConditions,
        offset: firstRecordIndex,
        limit: itemsPerPage,
        order: sortBy,
    })
}


    // --------------------- vendor product ----------------------

    // get vendor product list
    async getVendorProductList(bodyData) {

    let data = await productSchema.findAndCountAll({
        where: {
            vendor_id: 2
        }
    });
    return data;

}

}

module.exports = productModel