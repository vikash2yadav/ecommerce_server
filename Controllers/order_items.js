const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const orderItemModel = new (require("../Models/order_items"));

class orderItemController {

    // add order item
    async addOrderItem(req, res) {
        try {
            
            let data = await orderItemModel.addOrderItem(req?.body);
            return res.handler.success(data, STATUS_MESSAGES.ORDER_ITEM.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update order item
    async updateOrderItem(req, res) {
        try {
            let data = await orderItemModel.updateOrderItem(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ORDER_ITEM);
            }

            return res.handler.success(data, STATUS_MESSAGES.ORDER_ITEM.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete order item
    async deleteOrderItem(req, res) {
        try {

            let data = await orderItemModel.deleteOrderItem(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ORDER_ITEM);
            }

            return res.handler.success(data, STATUS_MESSAGES.ORDER_ITEM.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get order item
    async getOrderItem(req, res) {
        try {

            let data = await orderItemModel.getOrderItem(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ORDER_ITEM);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get order list
    async getOrderItemList(req, res) {
        
        try {
            let data = await orderItemModel.getOrderItemList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

}

module.exports = orderItemController