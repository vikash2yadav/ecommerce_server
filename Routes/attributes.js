const attributeController = new (require('../Controllers/attributes'));
const router = require('express').Router();
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const { adminAuth } = new (require("../Middleware/authentication"));

// add attribute
router.route('/add').post(validate([
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
]), adminAuth, attributeController.addAttribute);

// update attribute
router.route("/update").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME)
]), adminAuth, attributeController.updateAttribute);

// delete attribute
router.route("/delete/:id").delete(adminAuth, attributeController.deleteAttribute);


// get attribute by id
router.route("/get/:id").get(adminAuth, attributeController.getAttributeById);

// list attribute
router.route("/get/list").post(adminAuth, attributeController.getAttributeList);

module.exports = router