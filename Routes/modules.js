const router = require('express').Router();
const moduleController = new(require("../Controllers/modules"));
const { adminAuth } = new (require("../Middleware/authentication"));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');

// add modules 
router.route("/add").post(validate([
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
]), adminAuth, moduleController.addModule);

// update modules 
router.route("/update").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
]), adminAuth, moduleController.updateModule);

// delete modules 
router.route("/delete/:id").delete(adminAuth, moduleController.deleteModule);

// get by id modules 
router.route("/get/:id").get(adminAuth, moduleController.getModuleById);

// list modules 
router.route("/get/list").post(adminAuth, moduleController.getModuleList);

module.exports = router;