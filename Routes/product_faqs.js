const router = require('express').Router();
const productFaqController = new (require('../Controllers/product_faqs'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {adminAuth} = new(require('../Middleware/authentication'));

// ------------------- admin route --------------------

// add product faq
router.route('/add').post(validate([
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("question").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.QUESTION),
    body("answer").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ANSWER),
]),adminAuth, productFaqController.addProductFaq);

// update product faq
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("question").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.QUESTION),
    body("answer").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ANSWER),
]),adminAuth, productFaqController.updateProductFaq);

// delete product faq
router.route('/delete/:id').delete(adminAuth, productFaqController.deleteProductFaq);

// get by id
router.route('/get/:id').get(productFaqController.getProductFaq);

// get all list
router.route('/get/list').post(productFaqController.getProductFaqList);



// ---------------- vendor route ----------------------

// get Vendor product faq list
router.route('/vendor/get/list').post(productFaqController.getVendorProductFaqList);

module.exports = router;