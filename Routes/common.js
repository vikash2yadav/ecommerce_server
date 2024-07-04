const router = require('express').Router();
const commonController = new (require('../Controllers/common'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');


// get country by id
router.route('/country/get/:id').get(commonController.getCountryById);

// get all country list
router.route('/country/get/list').post(commonController.getCountryList);

// get city by id
router.route('/city/get/:id').get(commonController.getCityById);

// get all city list
router.route('/city/get/list').post(commonController.getCityList);

// get state by id
router.route('/state/get/:id').get(commonController.getStateById);

// get all state list
router.route('/state/get/list').post(commonController.getStateList);


module.exports = router;