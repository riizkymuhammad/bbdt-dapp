const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    caseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Case' },
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    status: { type: String, enum: ['pending', 'completed', 'failed'] },
    transactionHash: String,
    timestamp: Date,
}, { timestamps: true });
module.exports = mongoose.model('Transaction', transactionSchema);
