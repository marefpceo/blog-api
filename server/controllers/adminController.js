require('dotenv').config();

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { DateTime } = require('luxon');

// Required models
const Article = require('../models/articleModel');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');
const SiteCount = require('../models/siteCount');

// Schedule to reset weekly count every Sunday at midnight PST
const cron = require('node-cron');

cron.schedule('0 0 * * 0', async () => {
  const countTemp = await SiteCount.findById(
    `${process.env.SITE_COUNT_ID}`,
    'weekly_count',
  ).exec();
  SiteCount.findByIdAndUpdate(`${process.env.SITE_COUNT_ID}`, {
    weekly_count: 0,
    previous_weekly_count: countTemp.weekly_count,
  }).exec(),
    console.log('Weekly count reset', countTemp.weekly_count);
});

// Handle GET admin dashboard
exports.admin_get = asyncHandler(async (req, res, next) => {
  const [
    totalArticles,
    publishedArticles,
    nonpublishedArticles,
    edit_required,
    totalUsers,
    totalAdmins,
    totalEditors,
    regularUsers,
    siteVisits,
  ] = await Promise.all([
    Article.countDocuments().exec(),
    Article.countDocuments({ isPublished: true }).exec(),
    Article.countDocuments({ isPublished: false }).exec(),
    Article.countDocuments({ edit_required: true }).exec(),
    User.countDocuments().exec(),
    User.countDocuments({ role: 'admin' }).exec(),
    User.countDocuments({ role: 'editor' }).exec(),
    User.countDocuments({ role: 'user' }).exec(),
    SiteCount.findById(process.env.SITE_COUNT_ID).exec(),
  ]);

  const articleInfo = {
    totalArticles: totalArticles,
    publishedArticles: publishedArticles,
    nonpublishedArticles: nonpublishedArticles,
    edit_required: edit_required,
  };

  const userInfo = {
    totalUsers: totalUsers,
    totalAdmins: totalAdmins,
    totalEditors: totalEditors,
    regularUsers: regularUsers,
  };

  const siteCount = {
    siteVisits: siteVisits.count_total,
    weeklyVisits: siteVisits.weekly_count,
    weeklyUsers: siteVisits.weekly_user_count,
    lastWeekVisits: siteVisits.previous_weekly_count,
    weeklyLikes: siteVisits.weekly_likes_count,
  };

  res.json({
    message: 'Admin Dashboard',
    articleInfo: articleInfo,
    userInfo: userInfo,
    siteCount: siteCount,
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
  const selectedArticle = await Article.findById(req.params.id).exec();
  res.json({
    selectedArticle,
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

// Handle PUT to edit and update article
exports.admin_articles_put = [
  body('article_title')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Title must contain at least 3 characters')
    .escape(),
  body('article_summary')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Summary must contain at least 3 characters'),
  body('article_text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Text body must contain at least 3 characters')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const article = new Article({
      article_title: req.body.article_title,
      article_text: req.body.article_text,
      article_summary: req.body.article_summary,
      edited_by: req.body.edited_by,
      main_image: req.body.main_image,
      _id: req.body._id,
    });

    if (!errors.isEmpty()) {
      res.json({
        article,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedArticle = article;
      await Article.findByIdAndUpdate(updatedArticle._id, updatedArticle);
      res.json({
        message: 'ADMIN: Edit article',
      });
    }
  }),
];

// Handle publish and unpublishing of articles
exports.admin_articles_publish = asyncHandler(async (req, res, next) => {
  await Article.findByIdAndUpdate(req.body._id, {
    isPublished: req.body.isPublished,
  }).exec();
  res.json({
    message: req.body._id,
  });
});

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
