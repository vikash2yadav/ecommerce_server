const router = require('express').Router();
const cartProductController = new (require('../Controllers/carts'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {userAuth} = new(require('../Middleware/authentication'));

// --------------- admin route ------------------------

// add cart
router.route('/add').post(validate([
    body("user_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.USER),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("quantity").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.QUANTITY)
]),
    cartProductController.addCartProduct);

// update cart
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("user_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.USER),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
    body("quantity").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.QUANTITY)
]), cartProductController.updateCartProduct);

// delete cart
router.route('/delete/:id').delete(cartProductController.deleteCartProduct);

// get by id 
router.route('/get/:id').get(cartProductController.getCartProduct);

// get all list
router.route('/get/list').post(cartProductController.getCartProductList);


// -------------------- customer route -------------------

// get all list
router.route('/my/get/list').post(userAuth, cartProductController.getCustomerCartProductList);


module.exports = router;