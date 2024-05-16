const userController = new(require('../Controllers/users'));
const router = require('express').Router();

// auth route
router.route('/sign_up').post(userController.signUp);
router.route('/sign_in').post(userController.signIn);
router.route('/forgot_password').post(userController.forgotPassword);
router.route('/otp_verification').post(userController.otpVerificationByOtp)
router.route('/reset_password/:id').post(userController.resetPassword);
router.route('/sign_out').post(userController.signOut);
router.route("/update/profile").put(userController.updateProfile);

// // admin route
// router.route("/add").post(userController.addUser);
// router.route('/update').put(userController.updateUser);
// router.route('/delete/:id').delete(userController.deleteUser);
// router.route('/user_status_change').put(userController.changeStatus);

module.exports = router