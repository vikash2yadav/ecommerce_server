const { product_reviews: productReviewSchema, attributes: attributeSchema, products: productSchema, users: userSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class productReviewModel {

    // -------------------- admin route ---------------------

    // add product review
    async addProductReview(bodyData, adminInfo) {

        let checkProductReview = await productReviewSchema.findOne({
            where: {
                product_id: bodyData?.product_id,
                user_id: bodyData?.user_id,  // wwwwwwwwww
                is_delete: STATUS.NOTDELETED
            }
        })

        if (checkProductReview) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            }
        }

        bodyData.created_by = adminInfo?.id;

        return await productReviewSchema.create(bodyData);
    }

    // update product review
    async updateProductReview(bodyData, adminInfo) {

        let checkProductReview = await productReviewSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductReview) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        bodyData.updated_by = adminInfo?.id;

        return await productReviewSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // product review status change
    async productReviewStatusChange(bodyData, adminInfo) {

        let review = await productReviewSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!review) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        bodyData.updated_by = adminInfo?.id;

        return await productReviewSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete product review
    async deleteProductReview(id, adminInfo) {

        // check product review exist or not
        let checkProductReview = await productReviewSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductReview) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productReviewSchema.update({ is_delete: STATUS.DELETED, updated_by : adminInfo?.id }, {
            where: {
                id: id
            }
        })
    }

    // get product review
    async getProductReview(id) {

        // check product review exist or not
        let checkProductReview = await productReviewSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductReview) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return checkProductReview;
    }


    // get product review list
    async getProductReviewList(bodyData) {

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

        var filterQuery = {}, customerQuery = {}, productQuery = {}, productVariantQuery = {};
        if (bodyData?.filters && bodyData.filters.length > 0) {
            bodyData.filters.forEach((filter) => {
                if (filter.id != "" && filter.value != "") {
                    if (typeof (filter.value) === 'string') {
                        if (filter.id === 'user.full_name') {
                            customerQuery["full_name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        } 
                        else if (filter.id === 'product.name') {
                            productQuery["name"] = {
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
        if (Object.keys(customerQuery).length > 0) {
            includeConditions.push({
                model: userSchema,
                where: customerQuery,
            });
        } else {
            includeConditions.push({
                model: userSchema,
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

        return await productReviewSchema.findAndCountAll({
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


    
    // add new product review by admin
    async addNewProductReview(bodyData) {

        let checkExist = await productReviewSchema.findOne({
            where: {
                user_id: bodyData?.user_id,
                product_id: bodyData.product_id
            }
        });

        if (checkExist) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            }
        }

        return await productReviewSchema.create(bodyData);

    }


    // ------------ vendor route --------------------

    // get vendor product review list
    async getVendorProductReviewList(bodyData) {

        return await productReviewSchema.findAndCountAll({
            where: {
                is_delete: STATUS.NOTDELETED
            }, include:
                [
                    {
                        model: productSchema,
                        where: {
                            vendor_id: 1
                        }
                    }
                ]
        });

    }
}

module.exports = productReviewModel