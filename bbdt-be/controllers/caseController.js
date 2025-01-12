const Case = require('../models/Case');

exports.createCase = async (req, res) => {
    try {
        const newCase = new Case(req.body);
        await newCase.save();
        res.status(201).json(newCase);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCases = async (req, res) => {
    try {
        const cases = await Case.find();
        res.status(200).json(cases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCaseById = async (req, res) => {
    try {
        const caseById = await Case.findById(req.params.id);
        if (!caseById) return res.status(404).json({ message: 'Case not found' });
        res.status(200).json(caseById);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



