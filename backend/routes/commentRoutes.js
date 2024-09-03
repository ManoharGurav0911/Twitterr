const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new comment
router.post('/:tweetId', authMiddleware, commentController.createComment);

// Get comments by tweetId
router.get('/:tweetId', commentController.getCommentsByTweetId);

module.exports = router;