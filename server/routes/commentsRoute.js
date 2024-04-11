const express = require('express');
const router = express.Router();

// Required controller(s)
const comments_controller = require('../controllers/commentsController');

// GET Article comments
router.get('/:id/comments', comments_controller.article_comments_get);

// GET single comment from article
router.get('/:id/comments/:id', comments_controller.comment_get);

module.exports = router;
