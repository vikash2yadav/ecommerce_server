const router = require('express').Router();
const paymentController = new(require('../Controllers/payments'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add payment
router.route('/add').post(validate([
    body("order_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ORDER),
    body("mode").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PAYMENT_MODE),
    body("amount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.AMOUNT),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PAYMENT_STATUS),
]), paymentController.addPayment);

// update payment
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("order_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ORDER),
    body("mode").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PAYMENT_MODE),
    body("amount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.AMOUNT),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PAYMENT_STATUS),
]), paymentController.updatePayment);

// delete payment
router.route('/delete/:id').delete(paymentController.deletePayment);

// get by id
router.route('/get/:id').get(paymentController.getPayment);

// get all list
router.route('/get/list').post(paymentController.getPaymentList);

module.exports = router;