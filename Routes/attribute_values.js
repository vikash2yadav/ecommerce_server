const attributeValueController = new (require('../Controllers/attribute_values'));
const router = require('express').Router();
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const { adminAuth } = new (require("../Middleware/authentication"));

// add attribute value
router.route('/add').post(validate([
    body("attribute_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ATTRIBUTE),
    body("value").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.VALUE),
]), adminAuth, attributeValueController.addAttributeValue);

// update attribute value
router.route("/update").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("attribute_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ATTRIBUTE),
    body("value").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.VALUE),
]), adminAuth, attributeValueController.updateAttributeValue);

// delete attribute value
router.route("/delete/:id").delete(adminAuth, attributeValueController.deleteAttributeValue);


// get attribute value by id
router.route("/get/:id").get(adminAuth, attributeValueController.getAttributeValueById);

// list attribute value
router.route("/get/list").post(adminAuth, attributeValueController.getAttributeValueList);

module.exports = router