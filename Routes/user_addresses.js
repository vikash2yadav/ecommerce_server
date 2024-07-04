const router = require('express').Router();
const userAddressController = new(require('../Controllers/user_addresses'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const {userAuth} = new(require("../Middleware/authentication"));

// ----------------- admin route ---------------------

// add product
router.route('/add').post(validate([
    body("user_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
    body("contact_no").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONTACT),
    body("user_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.USER),
    body("street").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STREET),
    body("area").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.AREA),
    body("pin_code").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PIN_CODE),
    body("state_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATE_ID),
    body("city_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CITY),
    body("country_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COUNTRY_ID),
]), userAddressController.addUserAddress);

// update product
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("user_name").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NAME),
    body("user_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.USER),
    body("contact_no").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONTACT),
    body("street").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STREET),
    body("area").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.AREA),
    body("pin_code").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PIN_CODE),
    body("state_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATE_ID),
    body("city_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CITY),
    body("country_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.COUNTRY_ID),
]), userAddressController.updateUserAddress);

// delete product
router.route('/delete/:id').delete(userAddressController.deleteUserAddress);

// get by id
router.route('/get/:id').get(userAddressController.getUserAddress);

// get all list
router.route('/get/list').post(userAddressController.getUserAddressList);


// ----------------- customer route ---------------------

// add new address
router.route('/my/add_new').post(userAuth, userAddressController.addMyNewAddress) 

// get all list
router.route('/my/get/list').post(userAuth, userAddressController.getMyAddressList);

// get default address
router.route('/my/default').get(userAuth, userAddressController.getMyDefaultAddress);

// change default
router.route('/change/default/:id').put(userAuth, userAddressController.changeDefaultAddress);

// update my address
router.route('/my/update').put(userAuth, userAddressController.updateMyAddress);

// delete address 
router.route('/my/delete/:id').delete(userAuth, userAddressController.deleteMyAddress);


// ------------------- get city state country name ---------------------

router.route('/city_name/:id').post( userAddressController.getCityNameById);

router.route('/country_name/:id').post( userAddressController.getCountryNameById);

router.route('/state_name/:id').post( userAddressController.getStateNameById);

module.exports = router;