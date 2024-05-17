const router = require('express').Router();
const productReviewController = new(require('../Controllers/product_reviews'));

router.route('/add').post(productReviewController.addProductReview);
router.route('/update').put(productReviewController.updateProductReview);
router.route('/delete/:id').delete(productReviewController.deleteProductReview);
router.route('/get/:id').get(productReviewController.getProductReview);
router.route('/get/list').post(productReviewController.getProductReviewList);

module.exports = router;