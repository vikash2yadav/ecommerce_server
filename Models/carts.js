const { carts: cartSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class cartProductModel {

    // add cart product
    async addCartProduct(bodyData, userInfo) {

        let existProduct = await cartSchema.findOne({
            where: {
                product_id: bodyData?.product_id,
                user_id: bodyData?.user_id   // wwwwwwwwww
            }
        });

        if (existProduct) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // add cart product
        return await cartSchema.create(bodyData);
    }

    // update cart product
    async updateCartProduct(bodyData, userInfo) {

        // check cart product exist or not
        let checkProduct = await cartSchema.findOne({
            where: {
                id: bodyData?.id  // wwwwwww
            }
        })

        if (!checkProduct) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await cartSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete cart product
    async deleteCartProduct(id, userInfo) {

        // check cart product exist or not
        let checkProduct = await cartSchema.findOne({
            where: {
                id: id,
                // user_id: userInfo?.id  // wwwwwww
            }
        })

        if (!checkProduct) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // destroy cart product
        return await cartSchema.destroy({
            where: {
                id: id,
                // user_id: userInfo?.id 
            }
        })
    }

    // get cart product
    async getCartProduct(id, userInfo) { 

         // check cart product exist or not
         let checkCategory = await cartSchema.findOne({
            where: {
                id: id,
                // user_id: userInfo?.id  // wwwwwww
            }
        })

        if (!checkCategory) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await cartSchema.findOne({
            where:{
                id: id
            }
        })
    }

    // get cart product list
    async getCartProductList(bodyData) {

        return await cartSchema.findAndCountAll();
        
     }
}

module.exports = cartProductModel