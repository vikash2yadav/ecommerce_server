const router = require('express').Router();
const productVariantController = new(require('../Controllers/product_variants'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {adminAuth} = new(require('../Middleware/authentication'));

// ------------------ admin route -------------------

// add product variant
router.route('/add').post(validate([
    // body("attribute_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ATTRIBUTE),
    // body("attribute_value").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ATTRIBUTE_VALUE),
    // body("sku").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.SKU_CODE),
    // body("stock").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STOCK),
    // body("price").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRICE),
    // body("image").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.IMAGE),
    // body("discount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DISCOUNT),
    // body("weight").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.WEIGHT),
    // body("dimensions").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DIMENTION),
    // body("material").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.MATERIAL),
]), adminAuth, productVariantController.addProductVariant);

// update product variant
router.route('/update').put(validate([
    // body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    // body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    // body("attribute_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ATTRIBUTE),
    // body("attribute_value_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ATTRIBUTE_VALUE),
    // body("sku").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.SKU_CODE),
    // body("image").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.IMAGE),
    // body("price").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRICE),
    // body("discount").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DISCOUNT),
    // body("stock").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STOCK),
    // body("weight").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.WEIGHT),
    // body("dimensions").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DIMENTION),
    // body("material").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.MATERIAL),
]), productVariantController.updateProductVariant);

// delete product variant
router.route('/delete/:id').delete(productVariantController.deleteProductVariant);

// get product variant by id
router.route('/get/:id').get(productVariantController.getProductVariant);

// get parent product by id
router.route('/parent/get/:id').get(productVariantController.getParentProduct);

// get  product variant all list
router.route('/get/list').post(productVariantController.getProductVariantList);

// get  product variant by product id
router.route('/get_list/:id').get(productVariantController.getProductVariantListByProductId);


// -------------------- vendor route -----------------

// get all vendor product variant list 
router.route('/vendor/get/list').post(productVariantController.getVendorProductVariantList);

module.exports = router;