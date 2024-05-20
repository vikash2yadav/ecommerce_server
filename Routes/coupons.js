const router = require('express').Router();
const couponController = new(require('../Controllers/coupons'));

router.route('/add').post(couponController.addCoupon);
router.route('/update').put(couponController.updateCoupon);
router.route('/delete/:id').delete(couponController.deleteCoupon);
router.route('/get/:id').get(couponController.getCoupon);
router.route('/get/list').post(couponController.getCouponList);

module.exports = router;