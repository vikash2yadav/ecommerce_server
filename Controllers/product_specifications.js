const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const productSpecificationModel = new (require("../Models/product_specifications.js"));

class productSpecificationController {

    // ---------------------- admin route ------------------------
    
    // add product specification
    async addProductSpecification(req, res) {
        try {
            let data = await productSpecificationModel.addProductSpecification(req?.body, req?.adminInfo);

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_SPECIFICATION.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update product specification
    async updateProductSpecification(req, res) {
        try {
            let data = await productSpecificationModel.updateProductSpecification(req?.body, req?.adminInfo);
                
            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_SPECIFICATION);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_SPECIFICATION.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

     // product specification status change
     async productSpecificationStatusChange(req, res) {
        try {

            let data = await productSpecificationModel.productSpecificationStatusChange(req?.adminInfo, req?.body);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_SPECIFICATION);
            }

            return res.handler.success(data);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // delete product specification
    async deleteProductSpecification(req, res) {
        try {

            let data = await productSpecificationModel.deleteProductSpecification(req?.params?.id, req?.adminInfo);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_SPECIFICATION);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_SPECIFICATION.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product specification
    async getProductSpecificationById (req, res) {
        try {

            let data = await productSpecificationModel.getProductSpecificationById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_SPECIFICATION);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product specification list
    async getProductSpecificationList(req, res) {
        
        try {
            let data = await productSpecificationModel.getProductSpecificationList(req?.params?.id);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

}

module.exports = productSpecificationController