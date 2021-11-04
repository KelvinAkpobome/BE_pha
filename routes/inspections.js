const express = require('express');

const router = express.Router();
const { verifyToken, checkIfClient } = require('../middlewares/authentication');
const inspection = require('../controllers/inspectionController');

// post listings route
router.post('/listings/i/:bookingId', verifyToken, checkIfClient, inspection.scheduleInspection);
router.put('/listings/r/:bookingId', verifyToken, checkIfClient, inspection.rescheduleInspection);
router.delete('/listings/d/:bookingId', verifyToken, checkIfClient, inspection.cancelInspection);

module.exports = router;
