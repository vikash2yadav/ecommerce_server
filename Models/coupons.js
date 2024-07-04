const { coupons: couponSchema } = require('../Database/Schema');
const { STATUS_CODES } = require('../Config/constant');
const { Op } = require('sequelize');

class couponModel {

    // add coupon
    async addCoupon(bodyData, userInfo) {

        let existCoupon = await couponSchema.findOne({
            where: {
                code: bodyData?.code,
            }
        });

        if (existCoupon) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // add coupon
        return await couponSchema.create(bodyData);
    }

    // update coupon
    async updateCoupon(bodyData, userInfo) {

        // check coupon exist or not
        let checkCoupon = await couponSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkCoupon) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        let checkExistCode = await couponSchema.findOne({
            where: {
                code: bodyData?.code,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if(checkExistCode){ 
            return {
                status: STATUS_CODES.ALREADY_REPORTED        
            }
        }

        return await couponSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete coupon
    async deleteCoupon(id, userInfo) {

        // check coupon exist or not
        let checkCoupon = await couponSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkCoupon) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // destroy coupon
        return await couponSchema.destroy({
            where: {
                id: id,
            }
        })
    }

    // get coupon
    async getCoupon(id, userInfo) { 

         // check coupon exist or not
         let checkCoupon = await couponSchema.findOne({
            where: {
                id: id,
            }
        })

        if (!checkCoupon) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await couponSchema.findOne({
            where:{
                id: id
            }
        })
    }

    // get coupon list
    async getCouponList(bodyData) {

        return await couponSchema.findAndCountAll();
        
     }
}

module.exports = couponModel