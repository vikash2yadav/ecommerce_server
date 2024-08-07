const router = require('express').Router();
const specificationCategoryController = new (require('../Controllers/specification_categories.js'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {adminAuth} = new(require('../Middleware/authentication'));

// ------------------- admin route --------------------

// add specification category
router.route('/add').post(validate([
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
]),adminAuth, specificationCategoryController.addSpecificationCategory);

// update specification category
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
]),adminAuth, specificationCategoryController.updateSpecificationCategory);


// specification category status change
router.route("/status_change").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATUS)
]), adminAuth, specificationCategoryController.specificationCategoryStatusChange);


// delete specification category
router.route('/delete/:id').delete(adminAuth, specificationCategoryController.deleteSpecificationCategory);

// get by id
router.route('/get/:id').get(specificationCategoryController.getSpecificationCategoryById);

// get all list
router.route('/get/list').post(specificationCategoryController.getSpecificationCategoryList);


module.exports = router;