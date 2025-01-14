const { ethers } = require("ethers");
let nonces = {}; // Simpan nonce sementara di memori (gunakan database untuk produksi).
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

// 1. Kirimkan nonce ke pengguna
exports.getNonce = (req, res) => {
    const { walletAddress } = req.query;
    if (!walletAddress) return res.status(400).send("Wallet address is required.");

    const nonce = Math.floor(Math.random() * 1000000); // Buat nonce acak
    nonces[walletAddress] = nonce;
    res.status(200).json({ nonce });
};

// 2. Validasi tanda tangan
exports.verifySignature = (req, res) => {
    const { walletAddress, signature } = req.body;

    if (!walletAddress || !signature) return res.status(400).send("Missing parameters.");

    const nonce = nonces[walletAddress];
    if (!nonce) return res.status(400).send("Nonce not found.");

    const message = `Login request for wallet: ${walletAddress}. Nonce: ${nonce}`;
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() === walletAddress.toLowerCase()) {
        delete nonces[walletAddress]; // Hapus nonce setelah berhasil login
        return res.status(200).json({ success: true, message: "Signature verified." });
    } else {
        return res.status(401).json({ success: false, message: "Signature verification failed." });
    }
};


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({
      name,
      email,
      password
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const connectWallet = async (req, res) => {
  try {
    const { userId, walletAddress } = req.body

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.walletAddress = walletAddress
    await user.save()

    res.json({ message: 'Wallet connected successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}