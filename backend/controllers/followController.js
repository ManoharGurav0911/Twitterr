const Follow = require('../models/Follow');
const User = require('../models/User');
const authUtils = require('../utils/authUtils');

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);
    const followingId = req.params.userId;

    // Check if user already following
    const existingFollow = await Follow.findOne({
      follower: userId,
      following: followingId,
    });
    if (existingFollow) {
      return res.status(400).json({ message: 'Already following' });
    }

    // Create new follow
    const newFollow = new Follow({
      follower: userId,
      following: followingId,
    });

    // Save follow to database
    const savedFollow = await newFollow.save();

    // Add follower to following user's followers
    const followingUser = await User.findById(followingId);
    followingUser.followers.push(userId);
    await followingUser.save();

    // Add following user to follower's following list
    const user = await User.findById(userId);
    user.following.push(followingId);
    await user.save();

    // Add notification to the following user
    followingUser.notifications.push({
      type: 'follow',
      user: userId,
      sender: userId,
    });
    await followingUser.save();

    res.status(201).json({
      message: 'User followed successfully',
      follow: savedFollow,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);
    const followingId = req.params.userId;

    // Find follow
    const follow = await Follow.findOne({
      follower: userId,
      following: followingId,
    });
    if (!follow) {
      return res.status(404).json({ message: 'Follow not found' });
    }

    // Remove follower from following user's followers
    const followingUser = await User.findById(followingId);
    followingUser.followers = followingUser.followers.filter(
      (followerId) => followerId.toString() !== userId
    );
    await followingUser.save();

    // Remove following user from follower's following list
    const user = await User.findById(userId);
    user.following = user.following.filter(
      (followingId) => followingId.toString() !== followingId
    );
    await user.save();

    // Delete follow
    await Follow.findByIdAndDelete(follow._id);

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};