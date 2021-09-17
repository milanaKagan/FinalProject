const { Router } = require('express');
const airlineController = require('../controllers/airlineControllers');

const router = Router();

router.put('/airline/airlines', airlineController.updateAirline);
router.post('/airline/flights', airlineController.addFlight);
router.put('/airline/flights', airlineController.updateFlight);
router.delete('/airline/flights/:flight_id', airlineController.removeFlight);
module.exports = router;