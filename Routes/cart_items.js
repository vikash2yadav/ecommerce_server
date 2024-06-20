const router = require('express').Router();
const cartItemController = new (require('../Controllers/cart_items'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {userAuth} = new(require('../Middleware/authentication'));

// add cart item
router.route('/add').post(validate([
    body("cart_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CART),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("product_variant_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT_VARIANT),
    body("vendor_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.VENDOR),,
    body("quantity").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.QUANTITY),,
    body("total_price").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.TOTAL_PRICE),
]),
    cartItemController.addCartItem);

// update cart item
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("cart_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CART),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("product_variant_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT_VARIANT),
    body("vendor_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.VENDOR),,
    body("quantity").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.QUANTITY),,
    body("total_price").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.TOTAL_PRICE),
]), cartItemController.updateCartItem);

// delete cart item
router.route('/delete/:id').delete(cartItemController.deleteCartItem);

// get item by id 
router.route('/get/:id').get(cartItemController.getCartItem);

// get item all list
router.route('/get/list').post(cartItemController.getCartItemList);


// -------------------- customer route -------------------

// get all list
router.route('/my/get/list').post(userAuth, cartItemController.getCustomerCartItemList);

module.exports = router;