const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const cartItemModel = new (require("../Models/cart_items"));

class cartItemController {

    // add cart item
    async addCartItem(req, res) {
        try {
            let data = await cartItemModel.addCartItem(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.CART_ITEM);
            }

            return res.handler.success(data, STATUS_MESSAGES.CART_ITEM.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update cart item
    async updateCartItem(req, res) {
        try {
            let data = await cartItemModel.updateCartItem(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CART_ITEM);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.EXISTS.CART_ITEM);
            }

            return res.handler.success(data, STATUS_MESSAGES.CART_ITEM.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete cart item
    async deleteCartItem(req, res) {
        try {

            let data = await cartItemModel.deleteCartItem(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CART_ITEM);
            }

            return res.handler.success(data, STATUS_MESSAGES.CART_ITEM.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get cart item
    async getCartItem(req, res) {
        try {

            let data = await cartItemModel.getCartItem(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CART_ITEM);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get cart item list
    async getCartItemList(req, res) {        
        try {
            let data = await cartItemModel.getCartItemList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = cartItemController