const router = require('express').Router();
const cartProductController = new(require('../Controllers/carts'));

router.route('/add').post(cartProductController.addCartProduct);
router.route('/update').put(cartProductController.updateCartProduct);
router.route('/delete/:id').delete(cartProductController.deleteCartProduct);
router.route('/get/:id').get(cartProductController.getCartProduct);
router.route('/get/list').post(cartProductController.getCartProductList);

module.exports = router;