const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Get user's notifications
router.get('/', authMiddleware, notificationController.getNotifications);

// Mark notification as read
router.put('/:notificationId', authMiddleware, notificationController.markNotificationAsRead);

// Mark all notifications as read
router.put('/all', authMiddleware, notificationController.markAllNotificationsAsRead);

module.exports = router;