const router = require('express').Router();
const productController = new(require('../Controllers/products'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const { adminAuth } = new (require("../Middleware/authentication"));

// ----------------- admin route ---------------------

// add product
router.route('/add').post(adminAuth, validate([
    body("title").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.TITLE),
    body("description").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DESCRIPTION),
    body("sku").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.SKU_CODE),
    // body("image").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.IMAGE),
    body("category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CATEGORY),
    // body("price").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRICE),
    // body("discount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DISCOUNT),
    // body("stock").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STOCK),
    // body("weight").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.WEIGHT),
    // body("dimensions").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DIMENTION),
    // body("color").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COLOR),
    // body("material").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.MATERIAL),
]),adminAuth, productController.addProduct);

// update product
router.route('/update').put(adminAuth, validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("title").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.TITLE),
    body("sku").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.SKU_CODE),
    body("description").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DESCRIPTION),
    // body("image").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.IMAGE),
    body("category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CATEGORY),
    // body("price").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRICE),
    // body("discount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DISCOUNT),
    // body("stock").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STOCK),
    // body("weight").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.WEIGHT),
    // body("dimensions").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DIMENTION),
    // body("color").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COLOR),
    // body("material").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.MATERIAL),
]),adminAuth, productController.updateProduct);

// status change
router.route("/status_change").put(adminAuth, validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATUS)
]), adminAuth, productController.productStatusChange);

// delete product
router.route('/delete/:id').delete(adminAuth, productController.deleteProduct);

// get by id
router.route('/get/:id').get(adminAuth, productController.getProduct);

// get all list
router.route('/get/list').post(adminAuth, productController.getProductList);



// -------------------- vendor products ---------------

// get all vendor product list
router.route('/vendor/get/list').post(productController.getVendorProductList);

module.exports = router;