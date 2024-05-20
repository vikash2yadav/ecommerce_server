const router = require('express').Router();
const productFaqController = new(require('../Controllers/product_faqs'));

router.route('/add').post(productFaqController.addProductFaq);
router.route('/update').put(productFaqController.updateProductFaq);
router.route('/delete/:id').delete(productFaqController.deleteProductFaq);
router.route('/get/:id').get(productFaqController.getProductFaq);
router.route('/get/list').post(productFaqController.getProductFaqList);

module.exports = router;