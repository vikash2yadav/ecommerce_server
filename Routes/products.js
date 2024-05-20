const router = require('express').Router();
const productController = new(require('../Controllers/products'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add product
router.route('/add').post(validate([
    body("title").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.TITLE),
    body("description").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DESCRIPTION),
    body("image").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.IMAGE),
    body("category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CATEGORY),
    body("price").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRICE),
    body("discount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DISCOUNT),
    body("stock").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STOCK),
    body("weight").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.WEIGHT),
    body("dimensions").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DIMENTION),
    body("color").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COLOR),
    body("material").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.MATERIAL),
]), productController.addProduct);

// update product
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("title").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.TITLE),
    body("description").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DESCRIPTION),
    body("image").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.IMAGE),
    body("category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CATEGORY),
    body("price").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRICE),
    body("discount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DISCOUNT),
    body("stock").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STOCK),
    body("weight").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.WEIGHT),
    body("dimensions").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DIMENTION),
    body("color").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COLOR),
    body("material").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.MATERIAL),
]), productController.updateProduct);

// delete product
router.route('/delete/:id').delete(productController.deleteProduct);

// get by id
router.route('/get/:id').get(productController.getProduct);

// get all list
router.route('/get/list').post(productController.getProductList);

module.exports = router;