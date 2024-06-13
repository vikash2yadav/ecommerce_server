const { orders: orderSchema, order_items: orderItemSchema, products: productSchema, partners: partnerSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class orderModel {

    // add order
    async addOrder(bodyData) {

        return await orderSchema.create(bodyData);
    }

    // update order
    async updateOrder(bodyData) {

        // check exists order
        let checkOrder = await orderSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkOrder) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await orderSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete Order
    async deleteOrder(id) {

        // check exists order
        let checkOrder = await orderSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkOrder) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await orderSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get Order
    async getOrder(id) {

        // check exists order
        let checkOrder = await orderSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkOrder) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await orderSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get Order list
    async getOrderList(bodyData) {

        return await orderSchema.findAndCountAll({
            where: {
                is_delete: STATUS.NOTDELETED
            }
        });

    }


    // --------------------------- vendor routes ---------------------------

    // get vendor Order list
    async getVendorOrdersList(bodyData) {

        return await orderSchema.findAndCountAll({
            where: {
                is_delete: STATUS.NOTDELETED
            },
            include:
            {
                model: orderItemSchema,
                include: {
                    model: productSchema,
                    include: {
                        model: partnerSchema
                    }
                }
            }

        });

    }
}

module.exports = orderModel