const express = require('express');
const router = express.Router();
const odooController = require('../controllers/odooController');

// GET /api/odoo/status (health check)
router.get('/status', odooController.getStatus);

module.exports = router;
