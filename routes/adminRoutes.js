const { Router } = require('express');
const adminController = require('../controllers/adminControllers');
const mongoDbController = require('../controllers/mongoDbController');
/**
* @swagger
*components:
*   schemas:
*       Transaction:
*           type: object
*           required:
*               - url
*               - request
*               - params
*               - response
*           properties:
*            _id:
*               type: Object
*               description: The auto-generated id of the transaction.
*            request:
*               type: string
*               description: The request function.
*            params:
*               type: Object
*               description: The request params.
*       User:
*           type: object
*           required:
*               - username
*               - password
*               - email
*               - role
*           properties:
*            id:
*               type: integer
*               description: The auto-generated id of the user.
*            username:
*               type: string
*               description: The username of your user.
*            password:
*               type: string
*               description: The password of your user.
*            email:
*               type: string
*               description: The email of your user.
*            role:
*               type: string
*               description: The role of your user.
*/
/**
*  @swagger
*  tags:
*    name: AirlineUser
*    description: Admin user functionality.
*/
const router = Router();
/**
*  @swagger
*	/admin/airlines/{id}:
*     delete:
*       summary: Deletes a airline by id
*       tags: [AdminUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The Airline id
*       responses:
*         "204":
*           description: Delete was successful.
*/
router.delete('/admin/airlines/:airline_id', adminController.removeAirline);
/**
*  @swagger
*	/admin/customers:
*     get:
*       summary: Lists all the airlines
*       tags: [AdminUser]
*       responses:
*         "200":
*           description: The list of airlines.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Customer'
*         "400":
*           description: Bad Request.
*/
router.get('/admin/customers', adminController.getAllCustomers);
/**
*  @swagger
*	/admin/users:
*     get:
*       summary: Lists all the users
*       tags: [AdminUser]
*       responses:
*         "200":
*           description: The list of users.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/User'
*         "400":
*           description: Bad Request.
*/
router.get('/admin/users', adminController.getAllUsers);
/**
*  @swagger
*   /admin/users/{id}:
*     get:
*       summary: Gets a users by id
*       tags: [AdminUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The users id
*       responses:
*         "200":
*           description: Users by id.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/User'
*         "404":
*           description: Airline not found.
*         "400":
*           description: Bad Request.
*/
router.get('/admin/customers/:user_id', adminController.getUserById);
/**
*  @swagger
*	/admin/customers/{id}:
*     delete:
*       summary: Deletes a customer by id
*       tags: [AdminUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The Customers id
*       responses:
*         "204":
*           description: Delete was successful.
*/
router.delete('/admin/customers/:customer_id', adminController.removeCustomer);
/**
*  @swagger
*	/admin/transactions:
*     get:
*       summary: Lists all the transactions
*       tags: [AdminUser]
*       responses:
*         "200":
*           description: The list of transactions.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Transaction'
*         "400":
*           description: Bad Request.
*/
router.get('/admin/transactions', mongoDbController.getAllTransactions);

module.exports = router;