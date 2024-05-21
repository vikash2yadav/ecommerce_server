const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const bestSellerModel = new (require("../Models/best_sellers"));

class bestSellerController {

    // add best seller
    async addBestSeller(req, res) {
        try {
            let data = await bestSellerModel.addBestSeller(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.BEST_SELLER);
            }

            return res.handler.success(data, STATUS_MESSAGES.BEST_SELLER.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update best seller
    async updateBestSeller(req, res) {
        try {
            let data = await bestSellerModel.updateBestSeller(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.BEST_SELLER);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, STATUS_MESSAGES?.EXISTS.BEST_SELLER);
            }

            return res.handler.success(data, STATUS_MESSAGES.BEST_SELLER.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete best seller
    async deleteBestSeller(req, res) {
        try {

            let data = await bestSellerModel.deleteBestSeller(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.BEST_SELLER);
            }

            return res.handler.success(data, STATUS_MESSAGES.BEST_SELLER.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get best seller
    async getBestSeller(req, res) {
        try {

            let data = await bestSellerModel.getBestSeller(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.BEST_SELLER);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get best seller list
    async getBestSellerList(req, res) {
        try {
            let data = await bestSellerModel.getBestSellerList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = bestSellerController