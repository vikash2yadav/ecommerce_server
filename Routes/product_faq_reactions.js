const router = require('express').Router();
const productFaqReactionController = new(require('../Controllers/product_faq_reactions'));

router.route('/add').post(productFaqReactionController.addProductFaqReaction);
router.route('/update').put(productFaqReactionController.updateProductFaqReaction);
router.route('/delete/:id').delete(productFaqReactionController.deleteProductFaqReaction);
router.route('/get/:id').get(productFaqReactionController.getProductFaqReaction);
router.route('/get/list').post(productFaqReactionController.getProductFaqReactionList);

module.exports = router;