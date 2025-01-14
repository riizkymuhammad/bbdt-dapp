const express = require('express');
const { getNonce, verifySignature, connectWallet } = require('../controllers/authController');
import { protect } from '../middleware/auth'
const router = express.Router();

router.get('/nonce', getNonce); // Endpoint untuk mendapatkan nonce
router.post('/verify', verifySignature); // Endpoint untuk memverifikasi tanda tangan
router.post('/connect-wallet', protect, connectWallet)

module.exports = router;
