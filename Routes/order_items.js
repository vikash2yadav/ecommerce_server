const router = require('express').Router();
const orderItemController = new (require('../Controllers/order_items'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add order item
router.route('/add').post(validate([
    body("order_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ORDER),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("quantity").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.QUANTITY),
    body("unit_price").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRICE),
    body("unit_discount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DISCOUNT),
    body("total_discount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.TOTAL_DISCOUNT),
    body("total_amount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.AMOUNT),
]), orderItemController.addOrderItem);

// update order item
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("order_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ORDER),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("quantity").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.QUANTITY),
    body("unit_price").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRICE),
    body("unit_discount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DISCOUNT),
    body("total_discount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.TOTAL_DISCOUNT),
    body("total_amount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.AMOUNT),
]), orderItemController.updateOrderItem);

// delete order item
router.route('/delete/:id').delete(orderItemController.deleteOrderItem);

// get order item by id
router.route('/get/:id').get(orderItemController.getOrderItem);

// get order item all list by order id
router.route('/get_list/:id').get(orderItemController.getOrderItemListById);

module.exports = router;