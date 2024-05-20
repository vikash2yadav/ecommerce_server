const router = require('express').Router();
const paymentController = new(require('../Controllers/payments'));

router.route('/add').post(paymentController.addPayment);
router.route('/update').put(paymentController.updatePayment);
router.route('/delete/:id').delete(paymentController.deletePayment);
router.route('/get/:id').get(paymentController.getPayment);
router.route('/get/list').post(paymentController.getPaymentList);

module.exports = router;