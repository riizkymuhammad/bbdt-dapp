const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donationId: { type: String, unique: true, required: true },
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    transactionHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donation', donationSchema);
