const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const productModel = new (require("../Models/products"));

class productController {

    // add product
    async addProduct(req, res) {
        try {
            let data = await productModel.addProduct(req?.body);

            console.log(data)
            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, data?.message);
            }

            if (data.status === STATUS_CODES.NOT_ACCEPTABLE) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.PRODUCT.TRY_AGAIN);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update product
    async updateProduct(req, res) {
        try {
            let data = await productModel.updateProduct(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, data?.message);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
    
     // product status change
     async productStatusChange(req, res) {
        try {

            let data = await productModel.productStatusChange(req?.adminInfo, req?.body);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT.STATUS_CHANGED);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // delete product
    async deleteProduct(req, res) {
        try {

            let data = await productModel.deleteProduct(req?.params?.id, req?.adminInfo);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product
    async getProduct(req, res) {
        try {

            let data = await productModel.getProduct(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get product list
    async getProductList(req, res) {
        
        try {
            let data = await productModel.getProductList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }


    // ----------------- vendor route -------------------

    // get vendor product list
    async getVendorProductList(req, res) {
        
        try {
            let data = await productModel.getVendorProductList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = productController