const express = require('express');
const router = express.Router();
const retweetController = require('../controllers/retweetController');
const authMiddleware = require('../middleware/authMiddleware');

// Retweet a tweet
router.post('/:tweetId', authMiddleware, retweetController.retweetTweet);

// Unretweet a tweet
router.delete('/:tweetId', authMiddleware, retweetController.unretweetTweet);

module.exports = router;