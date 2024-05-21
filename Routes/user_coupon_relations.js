const router = require('express').Router();
const userCouponRelationController = new (require('../Controllers/user_coupon_relations'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add user_coupon_relations
router.route('/add').post(validate([
    body("user_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.USER),
    body("coupon_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COUPON),
]), userCouponRelationController.addUserCouponRelation);

// update user_coupon_relations
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("user_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.USER),
    body("coupon_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COUPON),
]), userCouponRelationController.updateUserCouponRelation);

// delete user_coupon_relations
router.route('/delete/:id').delete(userCouponRelationController.deleteUserCouponRelation);

// get by id
router.route('/get/:id').get(userCouponRelationController.getUserCouponRelation);

// get all list
router.route('/get/list').post(userCouponRelationController.getUserCouponRelationList);

module.exports = router;