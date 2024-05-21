const { Op } = require('sequelize');
const { STATUS_CODES, STATUS } = require('../Config/constant');
const { user_coupon_relations: userCouponRelationSchema } = require('../Database/Schema');

class userCouponRelationModel {

    // add user coupon relation
    async addUserCouponRelation(bodyData) {

        let data = await userCouponRelationSchema.findOne({
            where: {
                user_id: bodyData?.user_id,
                coupon_id: bodyData?.coupon_id
            }
        });

        if (data) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            }
        }

        return await userCouponRelationSchema.create(bodyData);

    }

    // update user coupon relation
    async updateUserCouponRelation(bodyData) {

        // check exist or not 
        let checkCoupon = await userCouponRelationSchema.findOne({
            where: {
                id: bodyData?.id
            }
        });

        if (!checkCoupon) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check exist or not 
        let existCouponRelation = await userCouponRelationSchema.findOne({
            where: {
                user_id: bodyData?.user_id,
                coupon_id: bodyData?.coupon_id,
                id: { [Op.ne]: bodyData?.id }
            }
        });

        if (existCouponRelation) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            }
        }

        return await userCouponRelationSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        });
    }

    // delete user coupon relation
    async deleteUserCouponRelation(id) {

        // check exist or not 
        let checkCoupon = await userCouponRelationSchema.findOne({
            where: {
                id: id,
            }
        });

        if (!checkCoupon) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await userCouponRelationSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get user coupon relation
    async getUserCouponRelation(id) { 

          // check exist or not 
          let checkCoupon = await userCouponRelationSchema.findOne({
            where: {
                id: id,
            }
        });

        if (!checkCoupon) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await userCouponRelationSchema.findOne({
            where:{
                id: id
            }
        })
    }

    // get user coupon relation list
    async getUserCouponRelationList(bodyData) { 

        return await userCouponRelationSchema.findAndCountAll();
        
    }
}

module.exports = userCouponRelationModel;