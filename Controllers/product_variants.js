const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const productVariantModel = new (require("../Models/product_variant"));

class productVariantController {

    // -------------- admin route ---------------

    // add productVariant
    async addProductVariant(req, res) {
        try {
            let data = await productVariantModel.addProductVariant(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, data?.message);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_VARIANT.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update productVariant
    async updateProductVariant(req, res) {
        try {
            let data = await productVariantModel.updateProductVariant(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, data?.message);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.EXISTS.PRODUCT_VARIANT);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_VARIANT.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete productVariant
    async deleteProductVariant(req, res) {
        try {

            let data = await productVariantModel.deleteProductVariant(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_VARIANT);
            }

            return res.handler.success(data, STATUS_MESSAGES.PRODUCT_VARIANT.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get productVariant
    async getProductVariant(req, res) {
        try {

            let data = await productVariantModel.getProductVariant(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_VARIANT);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }


    // get parent product
    async getParentProduct(req, res) {
        try {

            let data = await productVariantModel.getParentProduct(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }


    // get product Variant list
    async getProductVariantList(req, res) {
        
        try {
            let data = await productVariantModel.getProductVariantList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get productVariant by id
    async getProductVariantListByProductId(req, res) {
        try {

            let data = await productVariantModel.getProductVariantListByProductId(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_VARIANT);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }


    
    // ---------------- vendor product variant --------------------

    // get product Variant list
    async getVendorProductVariantList(req, res) {
        
        try {
            let data = await productVariantModel.getVendorProductVariantList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

}

module.exports = productVariantController