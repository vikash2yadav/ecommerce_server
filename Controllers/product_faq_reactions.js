const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const productFaqReactionModel = new (require("../Models/product_faq_reactions"));

class productFaqReactionController {

    // add product faqs reaction
    async addProductFaqReaction(req, res) {
        try {
            let data = await productFaqReactionModel.addProductFaqReaction(req?.body, req?.userInfo);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_FAQ_REACTION.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update product faq reaction
    async updateProductFaqReaction(req, res) {
        try {
            let data = await productFaqReactionModel.updateProductFaqReaction(req?.body);
                
            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_FAQ_REACTION.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete product faq reaction
    async deleteProductFaqReaction(req, res) {
        try {

            let data = await productFaqReactionModel.deleteProductFaqReaction(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_FAQ_REACTION.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product faq reaction
    async getProductFaqReaction(req, res) {
        try {

            let data = await productFaqReactionModel.getProductFaqReaction(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product faq reaction list
    async getProductFaqReactionList(req, res) {
        
        try {
            let data = await productFaqReactionModel.getProductFaqReactionList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = productFaqReactionController