const { product_faqs: productFaqSchema, admins: adminSchema, products: productSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class productFaqModel {

    // ---------------- admin route -----------------

    // add product faq
    async addProductFaq(bodyData, adminInfo) {

        // create product faq
        bodyData.created_by = adminInfo?.id;
        return await productFaqSchema.create(bodyData);
    }

    // update product faq
    async updateProductFaq(bodyData, adminInfo) {

        // check product faq exist or not
        let checkProductFaq = await productFaqSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductFaq) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        bodyData.updated_by = adminInfo?.id;

        return await productFaqSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // product faq status change
    async productFaqStatusChange(adminInfo, bodyData) {

        let productFaq = await productFaqSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!productFaq) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        bodyData.updated_by = adminInfo?.id;

        return await productFaqSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete product faq
    async deleteProductFaq(id, adminInfo) {

        // check product faq exist or not
        let checkProductFaq = await productFaqSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductFaq) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productFaqSchema.update({ is_delete: STATUS.DELETED, updated_by: adminInfo?.id }, {
            where: {
                id: id
            }
        })
    }

    // get product faq
    async getProductFaq(id) {

        // check product faq exist or not
        let checkProductFaq = await productFaqSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductFaq) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productFaqSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get product faq list
    async getProductFaqList(bodyData) {
        var currentPage,itemsPerPage,lastRecordIndex,firstRecordIndex;
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
                    }else{
                        sortBy.push([sort.id, 'asc'])
                    }
                }
            });
        }
        if (sortBy.length < 1) {
            sortBy = [['id', 'desc']];
        }

        var filterQuery = {}, productQuery = {}, createdByQuery = {}, updatedByQuery = {};
        if (bodyData?.filters && bodyData.filters.length > 0) {
            bodyData.filters.forEach((filter) => {
                if (filter.id != "" && filter.value != "") {
                    if (typeof (filter.value) === 'string') {
                        if (filter.id === 'product.name') {
                            productQuery["name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        }else if (filter.id === 'productFaqCreatedBy.full_name') {
                            createdByQuery["full_name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        } else if (filter.id === 'productFaqUpdatedBy.full_name') {
                            updatedByQuery["full_name"] = {
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
        if (Object.keys(createdByQuery).length > 0) {
            includeConditions.push({
                model: adminSchema,
                as: 'productFaqCreatedBy',
                where: createdByQuery,
            });
        } else {
            includeConditions.push({
                model: adminSchema,
                as: 'productFaqCreatedBy',
            });
        }

        if (Object.keys(productQuery).length > 0) {
            includeConditions.push({
                model: productSchema,
                where: productQuery,
                 attributes: ["name"],
            });
        } else {
            includeConditions.push({
                model: productSchema,
                 attributes: ["name"],
            });
        }

        if (Object.keys(updatedByQuery).length > 0) {
            includeConditions.push({
                model: adminSchema,
                as: 'productFaqUpdatedBy',
                where: updatedByQuery,
            });
        } else {
            includeConditions.push({
                model: adminSchema,
                as: 'productFaqUpdatedBy',
            });
        }

        return await productFaqSchema.findAndCountAll({
            where:{
                is_delete: STATUS.NOTDELETED,
                ...filterQuery
            },
            include: includeConditions,
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: sortBy,
        })
    }


    // ------------------------ vendor faqs -------------------
    // get product faq list
    async getVendorProductFaqList(bodyData) {

        return await productFaqSchema.findAndCountAll({
            where: {
                is_delete: STATUS.NOTDELETED,
            }, include: {
                model: productSchema,
                where: {
                    vendor_id: 1,
                }
            }
        });

    }

}

module.exports = productFaqModel