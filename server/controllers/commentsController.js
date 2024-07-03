require('dotenv').config();
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Required models
const Comment = require('../models/commentModel');

// Display Article comments
exports.article_comments_get = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ comment_article: req.params.id })
    .populate('comment_user')
    .sort({ timestamp: 1 });
  if (!comments) {
    res.status = 404;
  } else {
    res.json({
      comments,
      message: 'Comment List',
    });
  }
});

// View single comment
exports.comment_get = asyncHandler(async (req, res, next) => {
  const selectedComment = await Comment.findById(req.params.id);
  const role = jwt.verify(
    req.headers['Authorization'].split(' ')[1],
    process.env.SECRET,
  ).role;

  if (role !== 'Admin') {
    res.sendStatus(401);
  } else {
    res.json({
      selectedComment,
    });
  }
});

// Handle post comment
exports.comment_post = [
  body('comment_text')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Comments must contain a minimum of 3 characters')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const userId = jwt.verify(
      req.headers['authorization'].split(' ')[1],
      process.env.SECRET,
    )._id;
    const comment = new Comment({
      comment_text: req.body.comment_text,
      comment_article: req.body.comment_article,
      comment_user: userId,
    });

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    } else {
      await comment.save();
      res.json({
        status: 201,
      });
    }
  }),
];
