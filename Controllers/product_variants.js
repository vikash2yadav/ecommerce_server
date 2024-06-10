const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const productVariantModel = new (require("../Models/product_variant"));

class productVariantController {

    // add productVariant
    async addProductVariant(req, res) {
        try {
            let data = await productVariantModel.addProductVariant(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.PRODUCT_VARIANT);
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
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_VARIANT);
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

    // get product Variant list
    async getProductVariantList(req, res) {
        
        try {
            let data = await productVariantModel.getProductVariantList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = productVariantController