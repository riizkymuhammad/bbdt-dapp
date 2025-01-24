const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        console.log('check= ',req.body)
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create a new user
exports.registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        console.log('check= ',req.body)
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            walletAddress: req.body.walletAddress,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });


        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginwallet = async (req, res) => {
    const { walletAddress } = req.body;
  
    // Validasi input
    if (!walletAddress) {
      return res.status(400).json({ message: "walletAddress is required" });
    }
  
    try {
      // Cari pengguna berdasarkan walletAddress
      let user = await User.findOne({ walletAddress });
      console.log('check= ',user)
  
      if (user) {
        // Jika walletAddress ditemukan, lakukan login
        const token = jwt.sign(
          { id: user._id, walletAddress: user.walletAddress },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
  
        return res.json({
          message: "Login successful",
          token,
          user: { id: user._id, walletAddress: user.walletAddress, role:user.role },
        });
      } else {
        // Jika walletAddress tidak ditemukan, buat akun baru
        const newUser = new User({ walletAddress });
  

        await newUser.save();
  
        // Buat token JWT untuk pengguna baru
        const token = jwt.sign(
          { id: newUser._id, walletAddress: newUser.walletAddress },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
  
        return res.status(201).json({
          message: "Account created and logged in",
          token,
          user: { id: newUser._id, walletAddress: newUser.walletAddress },
        });
      }
    } catch (error) {
      console.error("Error in loginwallet:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };