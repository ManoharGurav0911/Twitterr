const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authUtils = require('../utils/authUtils');

// Authentication middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Set user ID in request object
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;