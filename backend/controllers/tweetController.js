const Tweet = require('../models/Tweet');
const User = require('../models/User');
const authUtils = require('../utils/authUtils');

// Create a new tweet
exports.createTweet = async (req, res) => {
  try {
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);
    const { content } = req.body;

    const newTweet = new Tweet({
      content,
      author: userId,
    });

    // Save tweet to database
    const savedTweet = await newTweet.save();

    // Add tweet to user's timeline
    const user = await User.findById(userId);
    user.tweets.push(savedTweet._id);
    await user.save();

    res.status(201).json({
      message: 'Tweet created successfully',
      tweet: savedTweet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tweets
exports.getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .populate('author')
      .sort({ createdAt: -1 });

    res.status(200).json(tweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tweets by a specific user
exports.getTweetsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tweets = await Tweet.find({ author: userId })
      .populate('author')
      .sort({ createdAt: -1 });

    res.status(200).json(tweets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single tweet
exports.getTweetById = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await Tweet.findById(tweetId)
      .populate('author')
      .populate('likes.user')
      .populate('retweets.user')
      .populate('comments.author');

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    res.status(200).json(tweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a tweet
exports.deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);

    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Check if user is the author
    if (tweet.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to delete this tweet' });
    }

    await Tweet.findByIdAndDelete(tweetId);
    res.status(200).json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};