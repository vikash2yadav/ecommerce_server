const slugify = require('slugify');
const { products: productSchema, product_variants: productVariantSchema, categories: categorySchema, partners: partnerSchema, attributes: attributeSchema, attribute_values: attributeValueSchema, admins: adminSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS, STATUS_MESSAGES } = require('../Config/constant');
const { Op } = require('sequelize');

class productModel {

    // add product
    async addProduct(bodyData) {

        // create slug for unique identification of product
        bodyData.slug = await slugify(bodyData?.name || '', {
            lower: true,
            strict: true
        });

        // check available slug exist or not
        let existSlug = await productSchema.findOne({
            where: {
                slug: bodyData?.slug
            }
        });

        if (existSlug) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED,
                message: STATUS_MESSAGES?.EXISTS?.SLUG
            }
        }

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

        // create product
        return await productSchema.create(bodyData);
    }

    // update product
    async updateProduct(bodyData) {

        // create slug for unique identification of product
        bodyData.slug = await slugify(bodyData?.name || '', {
            lower: true,
            strict: true
        });

        // check product exist or not
        let checkProduct = await productSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProduct) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check exists slug
        let checkSlug = await productSchema.findOne({
            where: {
                slug: bodyData?.slug,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkSlug) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.SLUG
            }
        }

        let checkSku = await productSchema.findOne({
            where: {
                sku: bodyData?.sku,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkSku) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.SKU_CODE
            }
        }

        return await productSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

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