const userCouponRelationModel = new(require('../Models/user_coupon_relations'));
const {STATUS_CODES, STATUS_MESSAGES} = require('../Config/constant');

class userCouponRelationController {

    // add userCouponRelation
    async addUserCouponRelation(req, res) {
        try {
            let data = await userCouponRelationModel.addUserCouponRelation(req?.body);

            if(data.status === STATUS_CODES.ALREADY_REPORTED){
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.USER_COUPON);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER_COUPON.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
     }

    // update userCouponRelation
    async updateUserCouponRelation(req, res) { 
        try {
            let data = await userCouponRelationModel.updateUserCouponRelation(req?.body);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.conflict(undefined, STATUS_MESSAGES.NOT_FOUND.USER_COUPON);
            }

            if(data.status === STATUS_CODES.ALREADY_REPORTED){
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.USER_COUPON);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER_COUPON.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete userCouponRelation
    async deleteUserCouponRelation(req, res) { 
        try {
             let data = await userCouponRelationModel.deleteUserCouponRelation(req?.params?.id);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.conflict(undefined, STATUS_MESSAGES.NOT_FOUND.USER_COUPON);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER_COUPON.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get userCouponRelation
    async getUserCouponRelation(req, res) { 
        try {
            let data = await userCouponRelationModel.getUserCouponRelation(req?.params?.id);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.conflict(undefined, STATUS_MESSAGES.NOT_FOUND.USER_COUPON);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get role list
    async getUserCouponRelationList(req, res) { 
        try {
            
            let data = await userCouponRelationModel.getUserCouponRelationList(req?.body);
            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = userCouponRelationController;