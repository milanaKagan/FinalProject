const { Router } = require('express');
const adminController = require('../controllers/adminControllers');

const router = Router();

router.get('/admin/get-all-uers', adminController.get_all_uers);



module.exports = router;