const { payments: paymentSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class paymentModel {

    // add payment
    async addPayment(bodyData) {
        
        return await paymentSchema.create(bodyData);
    }

    // update payment
    async updatePayment(bodyData) {

        // check exists payment
        let checkPayment = await paymentSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkPayment) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await paymentSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete payment
    async deletePayment(id) {

         // check exists payment
         let checkPayment = await paymentSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkPayment) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await paymentSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get Payment
    async getPayment(id) { 

        // check exists order
        let checkPayment = await paymentSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkPayment) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await paymentSchema.findOne({
            where:{
                id: id
            }
        })
    }

    // get payment list
    async getPaymentList(bodyData) {

        return await paymentSchema.findAndCountAll();
        
     }
}

module.exports = paymentModel