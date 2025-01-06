const express = require('express');
const { createCases, getCases } = require('../controllers/casesController');
const router = express.Router();

router.post('/', createCases);
router.get('/', getCases);

module.exports = router;
