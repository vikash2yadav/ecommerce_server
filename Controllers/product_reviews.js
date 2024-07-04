const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const productReviewModel = new (require("../Models/product_reviews"));

class productReviewController {

    // ----------------------- admin route --------------------

    // add product review
    async addProductReview(req, res) {
        try {
            let data = await productReviewModel.addProductReview(req?.body, req?.userInfo);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.PRODUCT_REVIEW);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_REVIEW.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update product review
    async updateProductReview(req, res) {
        try {
            let data = await productReviewModel.updateProductReview(req?.body);
                
            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_REVIEW.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete product review
    async deleteProductReview(req, res) {
        try {

            let data = await productReviewModel.deleteProductReview(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_REVIEW);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_REVIEW.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product review
    async getProductReview(req, res) {
        try {

            let data = await productReviewModel.getProductReview(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_REVIEW);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product list
    async getProductReviewList(req, res) {
        
        try {
            let data = await productReviewModel.getProductReviewList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // add product review by admin
    async addNewProductReview(req, res) {
        try {
            let data = await productReviewModel.addNewProductReview(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.PRODUCT_REVIEW);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_REVIEW.ADDED);
        } catch (error) {
            res.handler.serverError(error);
        }
    }


    // ------------------ vendor route ----------------------
     // get product  review list
     async getVendorProductReviewList(req, res) {
        
        try {
            let data = await productReviewModel.getVendorProductReviewList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

}

module.exports = productReviewController