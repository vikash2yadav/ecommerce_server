const { order_items: orderItemSchema, products: productSchema, partners: partnerSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class orderItemModel {

    // add order item
    async addOrderItem(bodyData) {

        return await orderItemSchema.create(bodyData);
    }

    // update order item
    async updateOrderItem(bodyData) {

        // check exists order item
        let checkOrder = await orderItemSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkOrder) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await orderItemSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete Order Item
    async deleteOrderItem(id) {

        // check exists order
        let checkOrder = await orderItemSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkOrder) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await orderItemSchema.destroy({
            where: {
                id: id
            }
        })
    }

    // get Order Item
    async getOrderItem(id) {

        // check exists order Item
        let checkOrder = await orderItemSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkOrder) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await orderItemSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get Order Item list
    async getOrderItemListById(id) {

        return await orderItemSchema.findAndCountAll({
            where: {
                order_id: id
            },
            include: [
                {
                    model: productSchema,
                    attributes: ['name', 'sku']
                }
            ]
        });

    }

}

module.exports = orderItemModel