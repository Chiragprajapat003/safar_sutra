const express = require('express');
const router = express.Router({ mergeParams: true });
const budgetController = require('../controllers/budgetController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, budgetController.getBudget);
router.put('/', authenticateToken, budgetController.updateBudget);

module.exports = router;
