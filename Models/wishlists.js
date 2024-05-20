const { wishlists: wishListSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class wishListModel {

    // add wish
    async addWish(bodyData) {
        
        return await wishListSchema.create(bodyData);
    }

    // update wish
    async updateWish(bodyData) {

        // check exists wish
        let checkWish = await wishListSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkWish) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await wishListSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete wish
    async deleteWish(id) {

         // check exists wish
         let checkWish = await wishListSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkWish) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await wishListSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get wish
    async getWish(id) { 

        // check exists wish
        let checkWish = await wishListSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkWish) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await wishListSchema.findOne({
            where:{
                id: id
            }
        })
    }

    // get wish list
    async getWishList(bodyData) {

        return await wishListSchema.findAndCountAll();
        
     }
}

module.exports = wishListModel