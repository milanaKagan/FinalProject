const { Router } = require('express');
const anonController = require('../controllers/anonControllers');

const router = Router();

router.get('/anonim/airlines', anonController.getAllAirlineCompanies);
router.get('/anonim/airlines/:airline_id', anonController.getAirlineById);
router.get('/anonim/flights', anonController.getAllFlights);
router.get('/anonim/flightsByParams', anonController.getFlightsByParameters);
router.get('/anonim/flights/:flight_id', anonController.getFlightById);
router.get('/anonim/flights/airline/:airline_id', anonController.getFlightsByAirlineId);
router.get('/anonim/flights/arrival/:country_id', anonController.getArrivalFlights);
router.get('/anonim/flights/departure/:country_id', anonController.getDepartureFlights);
router.get('/anonim/countries', anonController.getAllCountries);

module.exports = router;
