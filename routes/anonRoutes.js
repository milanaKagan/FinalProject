const { Router } = require('express');
const anonController = require('../controllers/anonControllers');

const router = Router();
/**
* @swagger
*components:
*   schemas:
*       Country:
*           type: object
*           required:
*               - name
*           properties:
*            id:
*               type: integer
*               description: The auto-generated id of the country.
*            name:
*               type: string
*               description: The name of your country.
*       Airline:
*           type: object
*           required:
*               - name
*               - country_id
*               - user_id
*           properties:
*            id:
*               type: integer
*               description: The auto-generated id of the airline.
*            name:
*               type: string
*               description: The name of your airline.
*            country_id:
*                type: integer
*                description: The airline country id.
*            user_id:
*                type: integer
*                description: The user id which created airline.
*       Flight:
*           type: object
*           required:
*               - airline_id
*               - origin_country_id
*               - destination_country_id
*               - departure_time
*               - landing_time
*               - remaining_tickets
*           properties:
*            id:
*               type: integer
*               description: The auto-generated id of the  flight.
*            origin_country_id:
*               type: integer
*               description: origin country id of the flight.
*            destination_country_id:
*               type: integer
*               description: Destination country id of the flight.
*            departure_time:
*                type: DateTime
*                description: Departure time of a flight.
*            landing_time:
*                type: DateTime
*                description: Landing time of a flight.
*            remaining_tickets:
*                type: integer
*                description: Remaining tickets of a flight.
*/
/**
*  @swagger
*  tags:
*    name: AnonimusUser
*    description: Anonimus user functionality.
*/

/**
*  @swagger
*	/anonim/airlines:
*     get:
*       summary: Lists all the airlines
*       tags: [AnonimusUser]
*       responses:
*         "200":
*           description: The list of airlines.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Airline'
*         "400":
*           description: Bad Request.
*/
router.get('/anonim/airlines', anonController.getAllAirlineCompanies);
/**
*  @swagger
*   /anonim/airlines/{id}:
*     get:
*       summary: Gets a airline by id
*       tags: [AnonimusUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The airline id
*       responses:
*         "200":
*           description: Airline by id.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Airline'
*         "404":
*           description: Airline not found.
*         "400":
*           description: Bad Request.
*/
router.get('/anonim/airlines/:airline_id', anonController.getAirlineById);
/**
*  @swagger
*	/anonim/flights:
*     get:
*       summary: Lists all the flights
*       tags: [AnonimusUser]
*       responses:
*         "200":
*           description: The list of flights.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Flight'
*         "400":
*           description: Bad Request.
*/
router.get('/anonim/flights', anonController.getAllFlights);
/**
*  @swagger
*   /anonim/flightsByParams:
*     get:
*       summary: Gets a flight by parameters
*       tags: [AnonimusUser]
*       parameters:
*           - in: query
*             name: origin_country_id
*             schema:
*               type: integer
*             required: true
*           - in: query
*             name: destination_country_id
*             schema:
*               type: integer
*             required: true
*           - in: query
*             name: dateTime
*             schema:
*               type: string
*             required: true
*       responses:
*         "200":
*           description: Flight by departure country id
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Flight'
*         "404":
*           description: Flight not found.
*         "400":
*           description: Bad Request.
*/
router.get('/anonim/flightsByParams', anonController.getFlightsByParameters);
/**
*  @swagger
*   /anonim/flights/{id}:
*     get:
*       summary: Gets a flight by id
*       tags: [AnonimusUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The flight id
*       responses:
*         "200":
*           description: Flight by id.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Flight'
*         "404":
*           description: Flight not found.
*         "400":
*           description: Bad Request.
*/
router.get('/anonim/flights/:flight_id', anonController.getFlightById);
/**
*  @swagger
*   /anonim/flights/airline/{id}:
*     get:
*       summary: Gets a flight by airline id
*       tags: [AnonimusUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The airline id
*       responses:
*         "200":
*           description: Flight by airlineid.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Flight'
*         "404":
*           description: Flight not found.
*         "400":
*           description: Bad Request.
*/
router.get('/anonim/flights/airline/:airline_id', anonController.getFlightsByAirlineId);
/**
*  @swagger
*   /anonim/flights/arrival/{id}:
*     get:
*       summary: Gets a flight by arrival country id
*       tags: [AnonimusUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The arrival country id
*       responses:
*         "200":
*           description: Flight by arrival country id
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Flight'
*         "404":
*           description: Flight not found.
*         "400":
*           description: Bad Request.
*/
router.get('/anonim/flights/arrival/:country_id', anonController.getArrivalFlights);
/**
*  @swagger
*   /anonim/flights/departure/{id}:
*     get:
*       summary: Gets a flight by departure country id
*       tags: [AnonimusUser]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: integer
*           required: true
*           description: The departure country id
*       responses:
*         "200":
*           description: Flight by departure country id
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Flight'
*         "404":
*           description: Flight not found.
*         "400":
*           description: Bad Request.
*/
router.get('/anonim/flights/departure/:country_id', anonController.getDepartureFlights);
/**
*  @swagger
*	/anonim/countries:
*     get:
*       summary: Lists all the countries
*       tags: [AnonimusUser]
*       responses:
*         "200":
*           description: The list of countries.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Country'
*         "400":
*           description: Bad Request.
*/
router.get('/anonim/countries', anonController.getAllCountries);

module.exports = router;
