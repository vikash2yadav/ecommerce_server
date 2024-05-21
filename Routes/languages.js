const router = require('express').Router();
const languageController = new (require('../Controllers/languages'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add languages
router.route('/add').post(validate([
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LANGUAGE),
    body("code").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CODE),
]), languageController.addLanguage);

// update languages
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LANGUAGE),
    body("code").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CODE),
]), languageController.updateLanguage);

// delete languages
router.route('/delete/:id').delete(languageController.deleteLanguage);

// get languages by id
router.route('/get/:id').get(languageController.getLanguage);

// get languages all list
router.route('/get/list').post(languageController.getLanguageList);

module.exports = router;