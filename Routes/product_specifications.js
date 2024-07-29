const router = require('express').Router();
const productSpecificationController = new (require('../Controllers/product_specifications.js'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {adminAuth} = new(require('../Middleware/authentication'));

// ------------------- admin route --------------------

// add product specification
router.route('/add').post(validate([
    body("specification_category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.SPECIFICATION_CATEGORY),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("title").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.TITLE),
    body("value").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.VALUE),
]),adminAuth, productSpecificationController.addProductSpecification);

// update product specification
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("specification_category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.SPECIFICATION_CATEGORY),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("title").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.TITLE),
    body("value").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.VALUE),
]),adminAuth, productSpecificationController.updateProductSpecification);


// product specification status change
router.route("/status_change").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATUS)
]), adminAuth, productSpecificationController.productSpecificationStatusChange);


// delete product specification
router.route('/delete/:id').delete(adminAuth, productSpecificationController.deleteProductSpecification);

// get by id
router.route('/get/:id').get(productSpecificationController.getProductSpecificationById);

// get all list
router.route('/get/list/:id').post(productSpecificationController.getProductSpecificationList);


module.exports = router;