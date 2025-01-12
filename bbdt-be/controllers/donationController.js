const Donation = require('../models/Donation');

exports.addDonation = async (req, res) => {
    try {
        const newDonation = new Donation(req.body);
        await newDonation.save();
        res.status(201).json(newDonation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDonationById = async (req, res) => {
    try {
        const donationById = await Donation.findById(req.params.id);
        if (!donationById) return res.status(404).json({ message: 'Donation not found' });
        res.status(200).json(donationById);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
