require('dotenv').config();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Required models
const Comment = require('../models/commentModel');

// Display Article comments
exports.article_comments_get = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ comment_article: req.params.id }).populate().sort({ timestamp: 1 });
  res.json(comments);
});

// View single comment 
exports.comment_get = asyncHandler(async (req, res, next) => {
  const selectedComment = await Comment.findById(req.params.id);
  const role = jwt.verify(req.headers['authorization'].split(' ')[1], process.env.SECRET).role;
  
  if (role !== 'Admin') {
    res.sendStatus(401);
  } else {
    res.json({
      selectedComment
    });
  }
});
