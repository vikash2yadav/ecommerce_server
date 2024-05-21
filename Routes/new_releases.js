const router = require('express').Router();
const newReleaseController = new (require('../Controllers/new_releases'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add new release
router.route('/add').post(validate([
    body("category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CATEGORY),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
]), newReleaseController.addNewRelease);

// update new release
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("category_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CATEGORY),
    body("product_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PRODUCT),
]), newReleaseController.updateNewRelease);

// delete new release
router.route('/delete/:id').delete(newReleaseController.deleteNewRelease);

// get new release by id
router.route('/get/:id').get(newReleaseController.getNewRelease);

// get new release all list
router.route('/get/list').post(newReleaseController.getNewReleaseList);

module.exports = router;