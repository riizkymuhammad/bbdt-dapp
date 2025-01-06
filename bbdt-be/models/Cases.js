const mongoose = require('mongoose');
const caseSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Cases' },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' },
    amountTarget: Number,
    amountCollected: { type: Number, default: 0 },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Cases' },
    donations: [{
        donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cases' },
        amount: Number,
        transactionHash: String,
        timestamp: Date,
    }],
}, { timestamps: true });
module.exports = mongoose.model('Case', caseSchema);
