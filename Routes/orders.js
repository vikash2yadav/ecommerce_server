const router = require('express').Router();
const orderController = new (require('../Controllers/orders'));
const validate = require("../Middleware/validator").validate;
const { body } = require("express-validator");
const { STATUS_MESSAGES } = require('../Config/constant');
const { userAuth, adminAuth} = new(require('../Middleware/authentication'));

// add order
router.route('/add').post(validate([
    body("user_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.USER),
    body("orderd_date").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ORDER_DATE),
    body("shipped_addresses_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.SHIPPED_ADD),
    body("total_amoumt").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.AMOUNT),
]),adminAuth, orderController.addOrder);

// update order
router.route('/update').put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("user_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.USER),
    body("orderd_date").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ORDER_DATE),
    body("shipped_addresses_id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.SHIPPED_ADD),
    body("total_amoumt").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.AMOUNT),
]),adminAuth, orderController.updateOrder);


// status change
router.route("/status_change").put(validate([
    body("id").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.ID),
    body("status").notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.STATUS)
]), adminAuth, orderController.orderStatusChange);


// delete order
router.route('/delete/:id').delete(adminAuth, orderController.deleteOrder);

// get by id
router.route('/get/:id').get(adminAuth, orderController.getOrder);

// get all list
router.route('/get/list').post(adminAuth, orderController.getOrderList);



// -------------------------- vendor routes ----------------------------

// get all vendors orders
router.route('/vendor/get/list').post(orderController.getVendorOrdersList);



// -------------------------- customer routes ----------------------------

// get all customer orders
router.route('/my/get/list').post(userAuth ,orderController.getMyOrdersList);

// update my order
router.route('/my/update').put(userAuth ,orderController.updateMyOrder);

// delete my order
router.route('/my/delete/:id').delete(userAuth ,orderController.deleteMyOrder);


module.exports = router;