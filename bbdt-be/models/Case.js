const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
    caseId: { type: String, unique: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['PROCESSING', 'EVALUATED', 'REJECTED', 'COMPLETED'],default: 'PROCESSING', required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    needyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trusteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Donation' }],
    createdAt: { type: Date, default: Date.now },
    isApproved: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Case', CaseSchema);

