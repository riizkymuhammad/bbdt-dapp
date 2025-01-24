const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String },
    name: { type: String },
    email: { type: String },
    role: { type: String, enum: ['Donor', 'Trustee', 'Needy'], default: 'Donor'},
    walletAddress: { type: String },
    status: { type: String, enum: ['approved', 'pending'], default: 'pending' },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('User', UserSchema);
