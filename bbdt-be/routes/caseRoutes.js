const express = require('express');
const caseController = require('../controllers/caseController');

const router = express.Router();

// CRUD routes
router.post('/', caseController.createCase);
router.get('/', caseController.getCases);


module.exports = router;
