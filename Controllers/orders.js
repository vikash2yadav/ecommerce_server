const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const orderModel = new (require("../Models/orders"));

class orderController {

    // add order
    async addOrder(req, res) {
        try {
            
            let data = await orderModel.addOrder(req?.body);
            return res.handler.success(data, STATUS_MESSAGES.ORDER.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update order
    async updateOrder(req, res) {
        try {
            let data = await orderModel.updateOrder(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ORDER);
            }

            return res.handler.success(data, STATUS_MESSAGES.ORDER.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete order
    async deleteOrder(req, res) {
        try {

            let data = await orderModel.deleteOrder(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ORDER);
            }

            return res.handler.success(data, STATUS_MESSAGES.ORDER.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get order
    async getOrder(req, res) {
        try {

            let data = await orderModel.getOrder(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ORDER);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get order list
    async getOrderList(req, res) {
        
        try {
            let data = await orderModel.getOrderList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }



    // ------------------ vendor controllers ---------------------

    // get vendor order list
    async getVendorOrdersList(req, res) {
        
        try {
            let data = await orderModel.getVendorOrdersList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = orderController