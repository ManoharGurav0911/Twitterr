const Like = require('../models/Like');
const Tweet = require('../models/Tweet');
const User = require('../models/User');
const authUtils = require('../utils/authUtils');

// Like a tweet
exports.likeTweet = async (req, res) => {
  try {
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);
    const tweetId = req.params.tweetId;

    // Check if user already liked the tweet
    const existingLike = await Like.findOne({ user: userId, tweet: tweetId });
    if (existingLike) {
      return res.status(400).json({ message: 'Tweet already liked' });
    }

    // Create new like
    const newLike = new Like({
      user: userId,
      tweet: tweetId,
    });

    // Save like to database
    const savedLike = await newLike.save();

    // Add like to tweet
    const tweet = await Tweet.findById(tweetId);
    tweet.likes.push(savedLike._id);
    await tweet.save();

    // Add notification to the tweet author
    const author = await User.findById(tweet.author);
    author.notifications.push({
      type: 'like',
      user: userId,
      tweet: tweetId,
      sender: userId,
    });
    await author.save();

    res.status(201).json({
      message: 'Tweet liked successfully',
      like: savedLike,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unlike a tweet
exports.unlikeTweet = async (req, res) => {
  try {
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);
    const tweetId = req.params.tweetId;

    // Find like
    const like = await Like.findOne({ user: userId, tweet: tweetId });
    if (!like) {
      return res.status(404).json({ message: 'Like not found' });
    }

    // Remove like from tweet
    const tweet = await Tweet.findById(tweetId);
    tweet.likes = tweet.likes.filter((likeId) => likeId.toString() !== like._id);
    await tweet.save();

    // Delete like
    await Like.findByIdAndDelete(like._id);

    res.status(200).json({ message: 'Tweet unliked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};