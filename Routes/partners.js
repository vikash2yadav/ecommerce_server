const partnerController = new (require('../Controllers/partners'));
const router = require('express').Router();
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {adminAuth, partnerAuth} = new(require('../Middleware/authentication'));


/* ------------------- partners routes ------------------- */

// sign in
router.route('/sign_in').post(validate([
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), partnerController.signIn);

// forgot password
router.route('/forgot_password').post(validate([
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
]), partnerController.forgotPassword);

// otp verifications
router.route('/otp_verification').post(validate([
    body("otp").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.OTP),
]), partnerController.otpVerificationByOtp);

// reset password
router.route('/reset_password/:id').post(validate([
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NEW_PASSWORD),
    body("confirm_password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONFIRM_PASSWORD),
]), partnerController.resetPassword);

// sign out
router.route('/sign_out').post(partnerAuth, partnerController.signOut);

// update self profile
router.route("/update/self/profile").put(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("birth_date").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.BIRTH_DATE),
    body("gender").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.GENDER),
]), partnerAuth, partnerController.updateSelfProfile);






/* -------------------- admin routes ------------- */

// add partner
router.route('/add').post(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), adminAuth, partnerController.add);


// status change
router.route("/status_change").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATUS)
]), adminAuth, partnerController.partnerStatusChange);


// update partner profile
router.route("/update").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
]), adminAuth, partnerController.updateProfile);

// delete partner
router.route("/delete/:id").delete(adminAuth, partnerController.deletePartner);

// get by id partner
router.route("/get/:id").get(adminAuth, partnerController.getPartnerById);

// get all list partner
router.route("/get/list").post(partnerController.getPartnerList);

// get all list partner
router.route("/vendor/get/list").post(partnerController.getVendorList);

// get all list partner
router.route("/delivery_partner/get/list").post(partnerController.getDeliveryPartnerList);


module.exports = router