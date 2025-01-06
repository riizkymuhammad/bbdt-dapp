const Cases = require('../models/Cases');

// Create new cases
const createCases = async (req, res) => {
    try {
        const cases = new Cases(req.body);
        await cases.save();
        res.status(201).json(cases);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all casess
const getCases = async (req, res) => {a
    try {
        const casess = await Cases.find();
        res.status(200).json(casess);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createCases, getCases };
