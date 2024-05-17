const router = require('express').Router();
const productController = new(require('../Controllers/products'));

router.route('/add').post(productController.addProduct);
router.route('/update').put(productController.updateProduct);
router.route('/delete/:id').delete(productController.deleteProduct);
router.route('/get/:id').get(productController.getProduct);
router.route('/get/list').post(productController.getProductList);

module.exports = router;