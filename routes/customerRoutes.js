const { Router } = require('express');
const customerController = require('../controllers/customerControllers');

const router = Router();

router.get('/customer/customers/:customer_id', customerController.getCustomerById);
router.put('/customer/customers', customerController.updateCustomer);
router.get('/customer/tickets/:customer_id', customerController.getTicketsByCustomer);
router.post('/customer/tickets', customerController.addTicket);
router.delete('/customer/tickets/:ticket_id', customerController.removeTicket);
router.post('/customer/customers', customerController.addCustomer);

module.exports = router;
