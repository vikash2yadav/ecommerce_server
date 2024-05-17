const router = require('express').Router();
const orderController = new(require('../Controllers/orders'));

router.route('/add').post(orderController.addOrder);
router.route('/update').put(orderController.updateOrder);
router.route('/delete/:id').delete(orderController.deleteOrder);
router.route('/get/:id').get(orderController.getOrder);
router.route('/get/list').post(orderController.getOrderList);

module.exports = router;