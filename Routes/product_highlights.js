const router = require('express').Router();
const productHighlightController = new (require('../Controllers/product_highlights.js'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {adminAuth} = new(require('../Middleware/authentication'));

// ------------------- admin route --------------------

// add product highlights
router.route('/add').post(validate([
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("content").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.QUESTION),
]),adminAuth, productHighlightController.addProductHighLight);

// update product highlights
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("content").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.QUESTION)
]),adminAuth, productHighlightController.updateProductHighLight);


// product highlights status change
router.route("/status_change").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATUS)
]), adminAuth, productHighlightController.productHighLightStatusChange);


// delete product highlights
router.route('/delete/:id').delete(adminAuth, productHighlightController.deleteProductHighLight);

// get by id
router.route('/get/:id').get(productHighlightController.getProductHighLightById);

// get all list
router.route('/get/list/:id').post(productHighlightController.getProductHighLightList);


module.exports = router;