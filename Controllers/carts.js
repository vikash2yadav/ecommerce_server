const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const cartProductModel = new (require("../Models/carts"));

class cartProductController {

    // add cart
    async addCartProduct(req, res) {
        try {
            let data = await cartProductModel.addCartProduct(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.CART_PRODUCT);
            }

            return res.handler.success(data, STATUS_MESSAGES.CART_PRODUCT.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update cart
    async updateCartProduct(req, res) {
        try {
            let data = await cartProductModel.updateCartProduct(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CART_PRODUCT);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.EXISTS.CART_PRODUCT);
            }

            return res.handler.success(data, STATUS_MESSAGES.CART_PRODUCT.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete cart
    async deleteCartProduct(req, res) {
        try {

            let data = await cartProductModel.deleteCartProduct(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CART_PRODUCT);
            }

            return res.handler.success(data, STATUS_MESSAGES.CART_PRODUCT.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get cart
    async getCartProduct(req, res) {
        try {

            let data = await cartProductModel.getCartProduct(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CART_PRODUCT);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get cart list
    async getCartProductList(req, res) {        
        try {
            let data = await cartProductModel.getCartProductList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }



    // ----------------------- customer route -----------------------

      // get customer cart product list
      async getCustomerCartProductList(req, res) {        
        try {
            let data = await cartProductModel.getCustomerCartProductList(req?.userInfo);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

}

module.exports = cartProductController