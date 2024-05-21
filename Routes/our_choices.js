const router = require('express').Router();
const ourChoiceController = new (require('../Controllers/our_choices'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add our choice
router.route('/add').post(validate([
    body("category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CATEGORY),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
]), ourChoiceController.addOurChoice);

// update our choice
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CATEGORY),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
]), ourChoiceController.updateOurChoice);

// delete our choice
router.route('/delete/:id').delete(ourChoiceController.deleteOurChoice);

// get our choice by id
router.route('/get/:id').get(ourChoiceController.getOurChoice);

// get our choice all list
router.route('/get/list').post(ourChoiceController.getOurChoiceList);

module.exports = router;