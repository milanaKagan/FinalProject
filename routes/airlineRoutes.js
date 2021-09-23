const { Router } = require('express');
const airlineController = require('../controllers/airlineControllers');

const router = Router();
/**
*  @swagger
*  tags:
*    name: AirlineUser
*    description: Airline user functionality.
*/
/**
*  @swagger
*   /airline/airlines:
*     put:
*       summary: Puts an airline
*       tags: [AirlineUser]
*       requestBody: 
*           required: true 
*           content: 
*               application/json: 
*                   schema: 
*                       $ref: '#/components/schemas/Airline'
*       responses:
*         "200":
*           description: Airline updated.      
*         "404":
*           description: Airline not found.
*         "400":
*           description: Bad Request.
*/
router.put('/airline/airlines', airlineController.updateAirline);
/**
*  @swagger
*   /airline/flights:
*     post:
*       summary: Post a Flight
*       tags: [AirlineUser]
*       requestBody: 
*           required: true 
*           content: 
*               application/json: 
*                   schema: 
*                       $ref: '#/components/schemas/Flight'
*       responses:
*         "200":
*           description: Flight added.
*         "400":
*           description: Bad Request.
*/
router.post('/airline/flights', airlineController.addFlight);
/**
*  @swagger
*   /airline/flights:
*     put:
*       summary: Puts a Flight
*       tags: [AirlineUser]
*       requestBody: 
*           required: true 
*           content: 
*               application/json: 
*                   schema: 
*                       $ref: '#/components/schemas/Flight'
*       responses:
*         "200":
*           description: Flight updated.
*         "400":
*           description: Bad Request.
*/
router.put('/airline/flights', airlineController.updateFlight);
/**
*  @swagger
*	/airline/flights/{id}:
*     delete:
*       summary: Deletes a flight by id
*       tags: [AirlineUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The flight id
*       responses:
*         "204":
*           description: Delete was successful.
*/
router.delete('/airline/flights/:flight_id', airlineController.removeFlight);
module.exports = router;