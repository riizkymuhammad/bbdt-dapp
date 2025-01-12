const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Create a new donation
router.post('/', async (req, res) => {
    const { donationId, caseId, donor, amount } = req.body;

    try {
        const newDonation = new Donation({ donationId, caseId, donor, amount });
        await newDonation.save();
        res.status(201).json(newDonation);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;