const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['donor', 'trustee', 'needy'], required: true },
    walletAddress: { type: String },
    status: { type: String, enum: ['approved', 'pending'], default: 'pending' },
    password: { type: String, required: true },

});

module.exports = mongoose.model('User', UserSchema);
