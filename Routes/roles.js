const router = require('express').Router();
const roleController = new(require('../Controllers/roles'));

router.route('/add').post(roleController.addRole);
router.route('/update').put(roleController.updateRole);
router.route('/delete/:id').delete(roleController.deleteRole);
router.route('/get/:id').get(roleController.getRole);
router.route('/get/list').post(roleController.getRoleList);

module.exports = router;