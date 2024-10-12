require('dotenv').config();
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

// Required models
const Comment = require('../models/commentModel');

// Display Article comments
exports.article_comments_get = asyncHandler(async (req, res, next) => {
  const comments = await prisma.comment.findMany({
    where: {
      articleId: parseInt(req.params.id),
    },
  });
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
  const selectedComment = await prisma.comment.findUnique({
    where: {
      id: parseInt(req.params.commentId),
    },
    include: {
      comment_user: true,
    },
  });
  if (!selectedComment) {
    res.status = 404;
  } else {
    res.json({
      selectedComment,
    });
  }
});

// Delete single comment
exports.comment_delete = asyncHandler(async (req, res, next) => {
  const deleteArticleId = await Comment.findById(req.params.commentId);

  if (!deleteArticleId) {
    res.status = 404;
  } else {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({
      message: 'Comment Deleted',
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
    ).id;

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    } else {
      await prisma.comment.create({
        data: {
          comment_text: req.body.comment_text,
          articleId: parseInt(req.body.comment_article),
          userId: parseInt(userId),
        },
      });
      res.json({
        status: 201,
      });
    }
  }),
];
