const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const productHighLightModel = new (require("../Models/product_highlights.js"));

class productHighlightController {

    // ---------------------- admin route ------------------------
    
    // add product highlight
    async addProductHighLight(req, res) {
        try {
            let data = await productHighLightModel.addProductHighLight(req?.body, req?.adminInfo);

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_HIGHLIGHT.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update product highlight
    async updateProductHighLight(req, res) {
        try {
            let data = await productHighLightModel.updateProductHighLight(req?.body, req?.adminInfo);
                
            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_HIGHLIGHT);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_HIGHLIGHT.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

     // product highlight status change
     async productHighLightStatusChange(req, res) {
        try {

            let data = await productHighLightModel.productHighLightStatusChange(req?.adminInfo, req?.body);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_HIGHLIGHT);
            }

            return res.handler.success(data);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // delete product highlight
    async deleteProductHighLight(req, res) {
        try {

            let data = await productHighLightModel.deleteProductHighLight(req?.params?.id, req?.adminInfo);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_HIGHLIGHT);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_HIGHLIGHT.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product highlight
    async getProductHighLightById (req, res) {
        try {

            let data = await productHighLightModel.getProductHighLightById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_HIGHLIGHT);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product highlight list
    async getProductHighLightList(req, res) {
        
        try {
            let data = await productHighLightModel.getProductHighLightList(req?.params?.id);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

}

module.exports = productHighlightController