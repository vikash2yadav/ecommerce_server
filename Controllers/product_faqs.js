const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const productFaqModel = new (require("../Models/product_faqs"));

class productFaqController {

    // ---------------------- admin route ------------------------
    
    // add product faqs
    async addProductFaq(req, res) {
        try {
            let data = await productFaqModel.addProductFaq(req?.body, req?.adminInfo);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.PRODUCT_FAQ);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_FAQ.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update product faqs
    async updateProductFaq(req, res) {
        try {
            let data = await productFaqModel.updateProductFaq(req?.body, req?.adminInfo);
                
            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_FAQ);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_FAQ.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete product faqs
    async deleteProductFaq(req, res) {
        try {

            let data = await productFaqModel.deleteProductFaq(req?.params?.id, req?.adminInfo);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_FAQ);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_FAQ.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product faqs
    async getProductFaq (req, res) {
        try {

            let data = await productFaqModel.getProductFaq(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_FAQ);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product faqs list
    async getProductFaqList(req, res) {
        
        try {
            let data = await productFaqModel.getProductFaqList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }



    // ------------------ vendor product faq ------------------

       // get  vendor product faqs list
       async getVendorProductFaqList(req, res) {
        
        try {
            let data = await productFaqModel.getVendorProductFaqList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = productFaqController