const { product_reviews: productReviewSchema, products: productSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class productReviewModel {

    // -------------------- admin route ---------------------

    // add product review
    async addProductReview(bodyData, userInfo) {

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

        return await productReviewSchema.create(bodyData);
    }

    // update product review
    async updateProductReview(bodyData) {

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

        return await productReviewSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete product review
    async deleteProductReview(id) {

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

        return await productReviewSchema.update({ is_delete: STATUS.DELETED }, {
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

        return await productReviewSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get product review list
    async getProductReviewList(bodyData) {

        return await productReviewSchema.findAndCountAll();

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