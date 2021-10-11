const { Router } = require('express');
const customerController = require('../controllers/customerControllers');
const auth = require('../middleware/authMiddleware')
const router = Router();

/**
* @swagger
*components:
*   schemas:
*       Ticket:
*           type: object
*           required:
*               - flight_id
*               - customer_id
*           properties:
*            id:
*               type: integer
*               description: The auto-generated id of the ticket.
*            flight_id:
*               type: integer
*               description: The id of flight.
*            customer_id:
*               type: integer
*               description: The id of customer.
*       Customer:
*           type: object
*           required:
*               - first_name
*               - last_name
*               - address
*               - phone_no
*               - credit_card_no
*               - user_id
*           properties:
*            id:
*               type: integer
*               description: The auto-generated id of the customer.
*            first_name:
*               type: string
*               description: The first_name of your customer.
*            last_name:
*               type: string
*               description: The last_name of your customer.
*            address:
*               type: string
*               description: The address of your customer.
*            phone_no:
*               type: string
*               description: The phone_no of your customer.
*            credit_card_no:
*               type: string
*               description: The credit_card_no of your customer.
*            user_id:
*                type: integer
*                description: The user id which of customer.
*/
/**
*  @swagger
*  tags:
*    name: CustomerUser
*    description: Customer user functionality.
*/
/**
*  @swagger
*   /customer/customers/{id}:
*     get:
*       summary: Gets a customer by id
*       tags: [CustomerUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The customer id
*       responses:
*         "200":
*           description: customer by id.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Customer'
*         "404":
*           description: Customer not found.
*         "400":
*           description: Bad Request.
*/
router.get('/customer/customers/:customer_id', auth.requireAuthCustomer,customerController.getCustomerById);
/**
*  @swagger
*   /customer/customers:
*     put:
*       summary: Puts a customer
*       tags: [CustomerUser]
*       requestBody: 
*           required: true 
*           content: 
*               application/json: 
*                   schema: 
*                       $ref: '#/components/schemas/Customer'
*       responses:
*         "200":
*           description: Customer updated.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Customer'
*         "404":
*           description: Customer not found.
*         "400":
*           description: Bad Request.
*/
router.put('/customer/customers', customerController.updateCustomer);
/**
*  @swagger
*   /customer/tickets/{id}:
*     get:
*       summary: Get ticket by customer id
*       tags: [CustomerUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The customer id
*       responses:
*         "200":
*           description: Ticket by customer id.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Ticket'
*         "404":
*           description: Ticket not found.
*         "400":
*           description: Bad Request.
*/
router.get('/customer/tickets/:customer_id',auth.requireAuthCustomer, customerController.getTicketsByCustomer);
/**
*  @swagger
*   /customer/tickets:
*     post:
*       summary: Post a Ticket
*       tags: [CustomerUser]
*       requestBody: 
*           required: true 
*           content: 
*               application/json: 
*                   schema: 
*                       $ref: '#/components/schemas/Ticket'
*       responses:
*         "200":
*           description: Ticket added.
*         "400":
*           description: Bad Request.
*/

router.post('/customer/tickets',customerController.addTicket);
/**
*  @swagger
*	/customer/tickets/{id}:
*     delete:
*       summary: Deletes a ticket by id
*       tags: [CustomerUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The ticket id
*       responses:
*         "204":
*           description: Delete was successful.
*/
router.delete('/customer/tickets/:ticket_id', customerController.removeTicket);
/**
*  @swagger
*   /customer/customers:
*     post:
*       summary: Post a Customer
*       tags: [CustomerUser]
*       requestBody: 
*           required: true 
*           content: 
*               application/json: 
*                   schema: 
*                       $ref: '#/components/schemas/Customer'
*       responses:
*         "200":
*           description: Customer added.
*         "400":
*           description: Bad Request.
*/
router.post('/customer/customers', customerController.addCustomer);

module.exports = router;
