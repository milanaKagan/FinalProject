const { Router } = require('express');
const adminController = require('../controllers/adminControllers');
const mongoDbController = require('../controllers/mongoDbController');


const router = Router();

router.delete('/admin/airlines/:airline_id', adminController.removeAirline);
router.get('/admin/customers', adminController.getAllCustomers);
router.get('/admin/users', adminController.getAllUsers);
router.get('/admin/users/:user_id', adminController.getUserById);
router.delete('/admin/customers/:customer_id', adminController.removeCustomer);
router.get('/admin/transactions', mongoDbController.getAllTransactions);

module.exports = router;