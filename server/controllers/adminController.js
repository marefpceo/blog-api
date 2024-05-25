require('dotenv').config();

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Required models
const Article = require('../models/articleModel');
const Comment = require('../models/commentModel');

// Handle GET admin dashboard
exports.admin_get = asyncHandler(async (req, res, next) => {
  res.json({
    message: 'Admin Dashboard',
  });
});

// Handle GET article list for ADMIN. (Published and Unpublished)
exports.admin_articles_list_get = asyncHandler(async (req, res, next) => {
  const articlesList = await Article.find().sort({ timestamp: 1 }).exec();
  res.json({
    message: 'ADMIN: Article List',
    articlesList,
  });
});

// Handle GET article by ID for ADMIN
exports.admin_articles_get = asyncHandler(async (req, res, next) => {
  const selectedArticle = await Article.findOne(req.id).exec();
  const articleComments = await Comment.find({
    comment_article: selectedArticle._id,
  })
    .populate('comment_user', 'username')
    .sort({ timestamp: 1 });
  res.json({
    message: 'ADMIN: Get article by ID',
    selectedArticle,
    comments: articleComments,
  });
});

// Handle POST to create new article with main image
exports.admin_articles_post = [
  body('article_title')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Title must contain at least 3 characters'),
  body('author')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Author must contain at least 3 characters'),
  body('article_summary')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Summary must contain at least 3 characters'),
  body('article_text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Text body must contain at least 3 characters'),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const article = new Article({
      article_title: req.body.article_title,
      article_summary: req.body.article_summary,
      author: req.body.author,
      article_text: req.body.article_text,
      isPublished: req.body.isPublished,
      main_image: req.file.filename,
    });

    if (!errors.isEmpty()) {
      res.json({
        message: 'Validation errors',
        article,
        errors: errors.array(),
      });
      return;
    } else {
      await article.save();
      res.json({
        message: `${article.article_title} was created`,
      });
    }
  }),
];

// Handle article body image upload and returns file name
exports.admin_article_image_upload = asyncHandler(async (req, res, next) => {
  res.json({
    location: req.file.filename,
  });
});

// Handle PUT to edit
exports.admin_articles_put = [
  body('article_title')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Title must contain at least 3 characters')
    .escape(),
  body('author')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Author must contain at least 3 characters')
    .escape(),
  body('article_text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Text body must contain at least 3 characters')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const article = new Article({
      article_title: req.body.article_title,
      author: req.body.author,
      article_text: req.body.article_text,
      isPublished: req.body.isPublished,
      _id: req.body.id,
    });

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    } else {
      const updatedArticle = article;
      await Article.findByIdAndUpdate(article._id, updatedArticle).exec();
      res.json({
        message: 'ADMIN: Edit article',
        updatedArticle,
      });
    }
  }),
];

// Handle DELETE to delete selected article
exports.admin_articles_delete = asyncHandler(async (req, res, next) => {
  const articleToDelete = await Article.findById(req.body.id).exec();

  if (!articleToDelete) {
    res.sendStatus(404);
  } else {
    await Article.findByIdAndDelete(articleToDelete._id).exec();
    res.json({
      message: `${articleToDelete.article_title} DELETED`,
    });
  }
});
