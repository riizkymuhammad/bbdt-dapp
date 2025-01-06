const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: { type: String, enum: ['donor', 'needy', 'trustee'], required: true },
    walletAddress: String,
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
