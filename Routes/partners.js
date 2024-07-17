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



//  ------------------- admin route ---------------------

// add vendor
router.route('/vendor/add').post(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), adminAuth, partnerController.addVendor);

// add partner
router.route('/delivery_partner/add').post(validate([
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body("password").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), adminAuth, partnerController.addDeliveryPartner);

// update vendor 
router.route("/vendor/update").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
]), adminAuth, partnerController.vendorUpdate);

// update partner 
router.route("/delivery_partner/update").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("first_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
    body("last_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
    body("email").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
    body("email").isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
]), adminAuth, partnerController.deliveryPartnerUpdate);

// vendor status change
router.route("/vendor/status_change").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATUS)
]), adminAuth, partnerController.vendorStatusChange);

// partner status change
router.route("/delivery_partner/status_change").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATUS)
]), adminAuth, partnerController.partnerStatusChange);

// delete vendor
router.route("/vendor/delete/:id").delete(adminAuth, partnerController.deleteVendor);

// delete partner
router.route("/delivery_partner/delete/:id").delete(adminAuth, partnerController.deletePartner);

// get by id vendor
router.route("/vendor/get/:id").get(adminAuth, partnerController.getVendorById);

// get by id partner
router.route("/delivery_partner/get/:id").get(adminAuth, partnerController.getPartnerById);

// get all list vendor
router.route("/vendor/get/list").post(partnerController.getVendorList);

// get all list partner
router.route("/delivery_partner/get/list").post(partnerController.getDeliveryPartnerList);


module.exports = router