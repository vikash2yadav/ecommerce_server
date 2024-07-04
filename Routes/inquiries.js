const router = require('express').Router();
const inquiryController = new (require('../Controllers/inquiries'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// ---------------- admin route ---------------------

// add inquiry
router.route('/add').post(validate([
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("phone").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PHONE),
    body("message").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.MESSAGE),
]), inquiryController.addInquiry);

// update inquiry
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("phone").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PHONE),
    body("message").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.MESSAGE),
]), inquiryController.updateInquiry);

// delete inquiry
router.route('/delete/:id').delete(inquiryController.deleteInquiry);

// get Inquiry by id
router.route('/get/:id').get(inquiryController.getInquiryById);

// get Inquiry all list
router.route('/get/list').post(inquiryController.getInquiryList);


// ----------------------- customer route --------------------

// add inquiry
router.route('/my/add').post(validate([
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("phone").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PHONE),
    body("message").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.MESSAGE),
]), inquiryController.addInquiryByCustomer);

module.exports = router;