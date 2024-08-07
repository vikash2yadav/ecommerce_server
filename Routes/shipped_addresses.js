const router = require('express').Router();
const shippedAddressController = new(require('../Controllers/shipped_addresses'));
const {adminAuth} = new(require("../Middleware/authentication"));

// ----------------- admin route ---------------------

// get by id
router.route('/get/:id').get(adminAuth, shippedAddressController.getShippedAddress);

module.exports = router;