const { cart_items: cartItemSchema, carts: cartSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class cartItemModel {

    // add cart item
    async addCartItem(bodyData, userInfo) {

        let existItem = await cartItemSchema.findOne({
            where: {
                product_variant_id: bodyData?.product_variant_id,
                user_id: bodyData?.user_id
            }
        });

        if (existItem) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // add cart product
        return await cartItemSchema.create(bodyData);
    }

    // update cart product
    async updateCartItem(bodyData, userInfo) {

        // check cart item exist or not
        let checkItem = await cartItemSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkItem) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await cartItemSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete cart item
    async deleteCartItem(id, userInfo) {

        // check cart item exist or not
        let checkItem = await cartItemSchema.findOne({
            where: {
                id: id,
            }
        })

        if (!checkItem) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // destroy cart product
        return await cartItemSchema.destroy({
            where: {
                id: id,
            }
        })
    }

    // get cart item
    async getCartItem(id, userInfo) {

        // check cart item exist or not
        let checkItem = await cartItemSchema.findOne({
            where: {
                id: id,
            }
        })

        if (!checkItem) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await cartItemSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get cart item list
    async getCartItemList(bodyData) {

        return await cartItemSchema.findAndCountAll();

    }


    // ----------------------- customer route --------------------

    // get customer cart item list
    async getCustomerCartItemList(userInfo) {

        return await cartItemSchema.findAndCountAll({
            include: [
                {
                    model: cartSchema,
                    where: {
                        user_id: userInfo?.id
                    }
                }
            ]
        });

    }

}

module.exports = cartItemModel