const Comment = require('../models/Comment');
const Tweet = require('../models/Tweet');
const User = require('../models/User');
const authUtils = require('../utils/authUtils');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const userId = authUtils.getUserIdFromToken(req.headers.authorization);
    const tweetId = req.params.tweetId;
    const { content } = req.body;

    const newComment = new Comment({
      content,
      author: userId,
      tweet: tweetId,
    });

    // Save comment to database
    const savedComment = await newComment.save();

    // Add comment to tweet
    const tweet = await Tweet.findById(tweetId);
    tweet.comments.push(savedComment._id);
    await tweet.save();

    // Add notification to the tweet author
    const author = await User.findById(tweet.author);
    author.notifications.push({
      type: 'comment',
      user: userId,
      tweet: tweetId,
      sender: userId,
    });
    await author.save();

    res.status(201).json({
      message: 'Comment created successfully',
      comment: savedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments by tweetId
exports.getCommentsByTweetId = async (req, res) => {
  try {
    const tweetId = req.params.tweetId;
    const comments = await Comment.find({ tweet: tweetId })
      .populate('author')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};