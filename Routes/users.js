const userController = new (require('../Controllers/users'));
const router = require('express').Router();
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {userAuth} = new(require("../Middleware/authentication"));

// sign up
router.route('/sign_up').post(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("username").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.USERNAME),
    body('password').isLength({ min: 8 }).withMessage(STATUS_MESSAGES?.VALIDATION?.LENGTH?.PASSWORD),
    body("confirm_password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONFIRM_PASSWORD),
    body("birth_date").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.BIRTH_DATE),
    body("gender").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.GENDER),
    body("country_code").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COUNTRY_CODE),
    body("contact_no").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONTACT),
    body("language_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LANGUAGE),
    body("user_addresses_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ADDRESS),
]), userController.signUp);

// sign in
router.route('/sign_in').post(validate([
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body('password').isLength({ min: 8 }).withMessage(STATUS_MESSAGES?.VALIDATION?.LENGTH?.PASSWORD),
]), userController.signIn);

// forgot password
router.route('/forgot_password').post(validate([
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
]), userController.forgotPassword);

// otp verifications
router.route('/otp_verification').post(validate([
    body("otp").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.OTP),
]), userController.otpVerificationByOtp);

// reset password
router.route('/reset_password/:id').post(validate([
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NEW_PASSWORD),
    body("confirm_password").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONFIRM_PASSWORD),
]), userController.resetPassword);

// sign out
router.route('/sign_out').post(userController.signOut);

// update profile
router.route("/update/profile").put(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("birth_date").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.BIRTH_DATE),
    body("gender").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.GENDER),
    body("country_code").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COUNTRY_CODE),
    body("contact_no").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONTACT),
    body("language_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LANGUAGE),
    body("user_addresses_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ADDRESS),
]), userController.updateProfile);

// change password
router.route("/change_password").put(userAuth, validate([
    body('old_password').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.OLD_PASSWORD),
    body('new_password').isLength({ min: 8 }).withMessage(STATUS_MESSAGES?.VALIDATION?.LENGTH?.PASSWORD),
    body('confirm_password').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.CONFIRM_PASSWORD)
]), userController.changePassword);


// // admin route
// router.route("/add").post(userController.addUser);
// router.route('/update').put(userController.updateUser);
// router.route('/delete/:id').delete(userController.deleteUser);
// router.route('/user_status_change').put(userController.changeStatus);

module.exports = router