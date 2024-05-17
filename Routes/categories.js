const router = require('express').Router();
const categoryController = new(require('../Controllers/categories'));

router.route('/add').post(categoryController.addCategory);
router.route('/update').put(categoryController.updateCategory);
router.route('/delete/:id').delete(categoryController.deleteCategory);
router.route('/get/:id').get(categoryController.getCategory);
router.route('/get/list').post(categoryController.getCategoryList);

module.exports = router;