const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { authenticateToken, optionalAuthenticateToken } = require('../middleware/auth');

// Public shared trip route
router.get('/share/:token', tripController.getSharedTrip);

// Protected routes
router.get('/', authenticateToken, tripController.getTrips);
router.post('/', authenticateToken, tripController.createTrip);
router.get('/:id', optionalAuthenticateToken, tripController.getTripById);
router.put('/:id', authenticateToken, tripController.updateTrip);
router.delete('/:id', authenticateToken, tripController.deleteTrip);

router.post('/:id/generate', authenticateToken, tripController.generateTripItinerary);
router.put('/:id/reorder', authenticateToken, tripController.reorderTrip);
router.post('/:id/share', authenticateToken, tripController.shareTrip);

module.exports = router;
