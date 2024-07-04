const router = require('express').Router();
const roleController = new (require('../Controllers/roles'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {adminAuth} = new(require('../Middleware/authentication'));

// add role
router.route('/add').post(validate([
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
]), adminAuth, roleController.addRole);

// update role
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
]), adminAuth, roleController.updateRole);

// delete role
router.route('/delete/:id').delete(adminAuth, roleController.deleteRole);

// get by id
router.route('/get/:id').get(adminAuth, roleController.getRole);

// get all list
router.route('/get/list').post(adminAuth, roleController.getRoleList);

module.exports = router;