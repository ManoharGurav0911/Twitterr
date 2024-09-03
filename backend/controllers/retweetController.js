const Retweet = require('../models/Retweet');
const Tweet = require('../models/Tweet');
const User = require('../models/User');
const authUtils = require('../utils/authUtils');

// Retweet a tweet
exports.retweetTweet = async (req, res) => {
  try {
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);
    const tweetId = req.params.tweetId;

    // Check if user already retweeted
    const existingRetweet = await Retweet.findOne({
      user: userId,
      tweet: tweetId,
    });
    if (existingRetweet) {
      return res.status(400).json({ message: 'Tweet already retweeted' });
    }

    // Create new retweet
    const newRetweet = new Retweet({
      user: userId,
      tweet: tweetId,
    });

    // Save retweet to database
    const savedRetweet = await newRetweet.save();

    // Add retweet to tweet
    const tweet = await Tweet.findById(tweetId);
    tweet.retweets.push(savedRetweet._id);
    await tweet.save();

    // Add notification to the tweet author
    const author = await User.findById(tweet.author);
    author.notifications.push({
      type: 'retweet',
      user: userId,
      tweet: tweetId,
      sender: userId,
    });
    await author.save();

    res.status(201).json({
      message: 'Tweet retweeted successfully',
      retweet: savedRetweet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Unretweet a tweet
exports.unretweetTweet = async (req, res) => {
  try {
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);
    const tweetId = req.params.tweetId;

    // Find retweet
    const retweet = await Retweet.findOne({ user: userId, tweet: tweetId });
    if (!retweet) {
      return res.status(404).json({ message: 'Retweet not found' });
    }

    // Remove retweet from tweet
    const tweet = await Tweet.findById(tweetId);
    tweet.retweets = tweet.retweets.filter(
      (retweetId) => retweetId.toString() !== retweet._id
    );
    await tweet.save();

    // Delete retweet
    await Retweet.findByIdAndDelete(retweet._id);

    res.status(200).json({ message: 'Tweet unretweeted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};