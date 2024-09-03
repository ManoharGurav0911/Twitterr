const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new tweet
router.post('/create', authMiddleware, tweetController.createTweet);

// Get all tweets
router.get('/', tweetController.getAllTweets);

// Get tweets by a specific user
router.get('/user/:userId', tweetController.getTweetsByUser);

// Get a single tweet
router.get('/:tweetId', tweetController.getTweetById);

// Delete a tweet
router.delete('/:tweetId', authMiddleware, tweetController.deleteTweet);

module.exports = router;