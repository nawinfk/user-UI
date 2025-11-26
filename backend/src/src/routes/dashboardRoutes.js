const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateToken = require('../middleware/authMiddleware');

// Protect this route with middleware
router.get('/stats', authenticateToken, dashboardController.getStats);

module.exports = router;
