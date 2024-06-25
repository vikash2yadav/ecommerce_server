const router = require('express').Router();
const couponController = new (require('../Controllers/coupons'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// ----------------- admin route ----------------------------

// add coupon
router.route('/add').post(validate([
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
    body("description").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DESCRIPTION),
    body("value").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.VALUE),
    body("code").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CODE),
    body("expired_time").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EXPIRED_TIME),
]), couponController.addCoupon);

// update coupon
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
    body("description").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DESCRIPTION),
    body("value").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.VALUE),
    body("code").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CODE),
    body("expired_time").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EXPIRED_TIME),
]),couponController.updateCoupon);

// delete coupon
router.route('/delete/:id').delete(couponController.deleteCoupon);

// get by id 
router.route('/get/:id').get(couponController.getCoupon);

// get all list
router.route('/get/list').post(couponController.getCouponList);


// 
module.exports = router;