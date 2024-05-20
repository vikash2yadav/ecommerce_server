const { product_faq_reactions: productFaqReactionSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class productFaqReactionModel {

    // add product faq reaction
    async addProductFaqReaction(bodyData) {
        
        // create product faq reaction
        return await productFaqReactionSchema.create(bodyData);
    }

    // update product faq reaction
    async updateProductFaqReaction(bodyData) {

        // check product faq reaction exist or not
        let checkProductFaqReaction = await productFaqReactionSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductFaqReaction) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productFaqReactionSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete product faq reaction
    async deleteProductFaqReaction(id) {

        // check product faq reaction exist or not
        let checkProductFaqReaction = await productFaqReactionSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductFaqReaction) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productFaqReactionSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get product faq reaction
    async getProductFaqReaction(id) { 

         // check product faq reaction exist or not
         let checkProductFaqReaction = await productFaqReactionSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductFaqReaction) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productFaqReactionSchema.findOne({
            where:{
                id: id
            }
        })
    }

    // get product faq reaction list
    async getProductFaqReactionList(bodyData) {

        return await productFaqReactionSchema.findAndCountAll();
        
     }
}

module.exports = productFaqReactionModel