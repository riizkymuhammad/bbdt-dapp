const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// CRUD routes
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/register', userController.registerUser);

// Login a user
router.post('/login', userController.loginUser);

module.exports = router;
