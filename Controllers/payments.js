const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const paymentModel = new (require("../Models/payments"));

class paymentController {

    // add payment
    async addPayment(req, res) {
        try {
            
            let data = await paymentModel.addPayment(req?.body);
            return res.handler.success(data, STATUS_MESSAGES.PAYMENT.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update Payment
    async updatePayment(req, res) {
        try {
            let data = await paymentModel.updatePayment(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PAYMENT);
            }

            return res.handler.success(data, STATUS_MESSAGES.PAYMENT.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete Payment
    async deletePayment(req, res) {
        try {

            let data = await paymentModel.deletePayment(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PAYMENT);
            }

            return res.handler.success(data, STATUS_MESSAGES.PAYMENT.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get payment
    async getPayment(req, res) {
        try {

            let data = await paymentModel.getPayment(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PAYMENT);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get payment list
    async getPaymentList(req, res) {
        
        try {
            let data = await paymentModel.getPaymentList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = paymentController