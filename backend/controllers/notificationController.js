const User = require('../models/User');
const authUtils = require('../utils/authUtils');

// Get user's notifications
exports.getNotifications = async (req, res) => {
  try {
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);
    const user = await User.findById(userId)
      .populate('notifications.sender')
      .populate('notifications.tweet');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find notification
    const notification = user.notifications.find(
      (notification) => notification._id.toString() === notificationId
    );
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Mark as read
    notification.read = true;
    await user.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark all notifications as read
exports.markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Mark all notifications as read
    user.notifications.forEach((notification) => {
      notification.read = true;
    });
    await user.save();

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};