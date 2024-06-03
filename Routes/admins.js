const adminController = new (require('../Controllers/admins'));
const router = require('express').Router();
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const { adminAuth } = new (require("../Middleware/authentication"));

// add admin
router.route('/add').post(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), adminController.add);

// sign in
router.route('/sign_in').post(validate([
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), adminController.signIn);

// forgot password
router.route('/forgot_password').post(adminAuth, adminController.forgotPassword);

// otp verifications
router.route('/otp_verification').post(validate([
    body("otp").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.OTP),
]), adminController.otpVerificationByOtp);

// reset password
router.route('/reset_password').put(validate([
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NEW_PASSWORD),
    body("confirm_password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONFIRM_PASSWORD),
]), adminAuth, adminController.resetPassword);

// sign out
router.route('/sign_out').post(adminAuth, adminController.signOut);

// update profile
router.route("/update/self/profile").put(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
]), adminAuth, adminController.updateSelfProfile);


// update admin profile
router.route("/update/profile").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("country_code").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COUNTRY_CODE),
    body("contact_no").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONTACT),
    body("birth_date").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.BIRTH_DATE)
]), adminAuth, adminController.updateProfile);


// status change
router.route("/status_change").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATUS)
]), adminAuth, adminController.adminStatusChange);


// delete admin
router.route("/delete/:id").delete(adminAuth, adminController.deleteAdmin);


// get by id
router.route("/get/:id").get(adminAuth, adminController.getAdminById);

// list
router.route("/list").post(adminAuth, adminController.getAdminList);

module.exports = router