const router = require('express').Router();
const bestSellerController = new (require('../Controllers/best_sellers'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add best sellers
router.route('/add').post(validate([
    body("category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CATEGORY),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
]), bestSellerController.addBestSeller);

// update best sellers
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CATEGORY),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
]), bestSellerController.updateBestSeller);

// delete best sellers
router.route('/delete/:id').delete(bestSellerController.deleteBestSeller);

// get best sellers by id
router.route('/get/:id').get(bestSellerController.getBestSeller);

// get best sellers all list
router.route('/get/list').post(bestSellerController.getBestSellerList);

module.exports = router;