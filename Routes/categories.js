const router = require('express').Router();
const categoryController = new (require('../Controllers/categories'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add category
router.route('/add').post(validate([
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
    body("description").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DESCRIPTION)
]), categoryController.addCategory);

// update category
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
    body("description").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.DESCRIPTION)
]), categoryController.updateCategory);

// delete category
router.route('/delete/:id').delete(categoryController.deleteCategory);

// get by id
router.route('/get/:id').get(categoryController.getCategory);

// get all list
router.route('/get/list').post(categoryController.getCategoryList);

module.exports = router;