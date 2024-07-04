const router = require('express').Router();
const wishListController = new(require('../Controllers/wishlists'));

router.route('/add').post(wishListController.addWish);
router.route('/update').put(wishListController.updateWish);
router.route('/delete/:id').delete(wishListController.deleteWish);
router.route('/get/:id').get(wishListController.getWish);
router.route('/get/list').post(wishListController.getWishList);

module.exports = router;