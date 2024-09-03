const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get current user's profile (protected)
router.get('/current', authMiddleware, userController.getCurrentUser);

// Update user's profile (protected)
router.put('/update', authMiddleware, userController.updateUser);

// Get user profile by username
router.get('/:username', userController.getUserByUsername);

module.exports = router;