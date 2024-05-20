const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const wishListModel = new (require("../Models/wishlists"));

class wishListController {

    // add wish
    async addWish(req, res) {
        try {
            let data = await wishListModel.addWish(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.WISH);
            }

            return res.handler.success(data, STATUS_MESSAGES.WISH.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update wish
    async updateWish(req, res) {
        try {
            let data = await wishListModel.updateWish(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.WISH);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.WISH);
            }

            return res.handler.success(data, STATUS_MESSAGES.WISH.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete wish
    async deleteWish(req, res) {
        try {

            let data = await wishListModel.deleteWish(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.WISH);
            }

            return res.handler.success(data, STATUS_MESSAGES.WISH.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get wish
    async getWish(req, res) {
        try {

            let data = await wishListModel.getWish(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.WISH);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get wish list
    async getWishList(req, res) {
        
        try {
            let data = await wishListModel.getWishList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = wishListController