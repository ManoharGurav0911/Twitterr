const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authMiddleware = require('../middleware/authMiddleware');

// Like a tweet
router.post('/:tweetId', authMiddleware, likeController.likeTweet);

// Unlike a tweet
router.delete('/:tweetId', authMiddleware, likeController.unlikeTweet);

module.exports = router;