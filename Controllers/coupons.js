const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const couponModel = new (require("../Models/coupons"));

class couponController {

    // add coupon
    async addCoupon(req, res) {
        try {
            let data = await couponModel.addCoupon(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.COUPON);
            }

            return res.handler.success(data, STATUS_MESSAGES.COUPON.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update coupon
    async updateCoupon(req, res) {
        try {
            let data = await couponModel.updateCoupon(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.COUPON);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.EXISTS.COUPON);
            }

            return res.handler.success(data, STATUS_MESSAGES.COUPON.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete coupon
    async deleteCoupon(req, res) {
        try {

            let data = await couponModel.deleteCoupon(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.COUPON);
            }

            return res.handler.success(data, STATUS_MESSAGES.COUPON.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get coupon
    async getCoupon(req, res) {
        try {

            let data = await couponModel.getCoupon(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.COUPON);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get coupon list
    async getCouponList(req, res) {        
        try {
            let data = await couponModel.getCouponList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = couponController