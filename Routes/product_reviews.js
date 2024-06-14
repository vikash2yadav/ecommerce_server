const router = require('express').Router();
const productReviewController = new (require('../Controllers/product_reviews'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

//-------------------- admin route ----------------------------

// add product review
router.route('/add').post(validate([
    body("rating").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.RATING),
    body("comment").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COMMENT),
]), productReviewController.addProductReview);

// update product review
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("rating").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.RATING),
    body("comment").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COMMENT),
]), productReviewController.updateProductReview);

// delete product review
router.route('/delete/:id').delete(productReviewController.deleteProductReview);

// get by id
router.route('/get/:id').get(productReviewController.getProductReview);

// get all list
router.route('/get/list').post(productReviewController.getProductReviewList);




/* ------------------- admin route ----------------------- */

// add product review
router.route('/new/add').post(validate([
    body("rating").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.RATING),
    body("user_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.USER),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("comment").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COMMENT),
]), productReviewController.addNewProductReview);



// -------------------- vendot route ------------------

// get list of vendor faq 
router.route('/vendor/get/list').post(productReviewController.getVendorProductReviewList);


module.exports = router;