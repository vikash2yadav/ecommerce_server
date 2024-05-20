const router = require('express').Router();
const productFaqReactionController = new (require('../Controllers/product_faq_reactions'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add product faq
router.route('/add').post(validate([
    body("reaction_type").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.REACTION),
]), productFaqReactionController.addProductFaqReaction);

// update product faq
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("reaction_type").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.REACTION),
]), productFaqReactionController.updateProductFaqReaction);

// delete product faq
router.route('/delete/:id').delete(productFaqReactionController.deleteProductFaqReaction);

// get by id
router.route('/get/:id').get(productFaqReactionController.getProductFaqReaction);

// get all list
router.route('/get/list').post(productFaqReactionController.getProductFaqReactionList);

module.exports = router;