const userController = new (require('../Controllers/users'));
const router = require('express').Router();
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const { userAuth, adminAuth } = new (require("../Middleware/authentication"));

/* -------------------- user route -------------------- */

// sign up
router.route('/sign_up').post(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), userController.signUp);

// sign in
router.route('/sign_in').post(validate([
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
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
router.route('/reset_password').post(validate([
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NEW_PASSWORD),
    body("confirm_password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONFIRM_PASSWORD),
]), userController.resetPassword);

// change password
router.route('/change_password').put(validate([
    body("old_password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
    body("new_password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NEW_PASSWORD),
    body("confirm_password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONFIRM_PASSWORD),
]), userAuth, userController.changePassword);

// sign out
router.route('/sign_out').post(userAuth, userController.signOut);

// get profile info
router.route('/get/my_profile').get(userAuth, userAuth, userController.getMyProfile);

// update profile
router.route("/update/self/profile").put(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("birth_date").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.BIRTH_DATE),
    body("gender").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.GENDER),
]), userAuth, userController.updateSelfProfile);

// get address 
router.route("/get/address").get(userAuth, userController.getAddress);

// delete my account 
router.route("/delete/account").delete(validate([
    body("email").notEmpty().isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), userController.deleteMyAccount);


/* ------------------ admin routes --------------- */

// status change
router.route("/status_change").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATUS)
]), adminAuth, userController.userStatusChange);

// admin route add user
router.route('/add').post(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), adminAuth, userController.addUser);

// admin route update user
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), adminAuth, userController.updateUser);

// admin route update user
router.route('/delete/:id').delete(adminAuth, userController.deleteUser);

// admin route get user by id
router.route('/get/:id').get(adminAuth, userController.getUserById);

// admin route get user list
router.route('/get/list').post(userController.getUserList);


module.exports = router