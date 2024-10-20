require('dotenv').config();

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('cloudinary').v2;
const helpers = require('../public/javascripts/helpers');

// Handle GET admin dashboard
exports.admin_get = asyncHandler(async (req, res, next) => {
  const totalArticles = await prisma.article.count();
  const publishedArticles = await prisma.article.count({
    where: {
      isPublished: true,
    },
  });
  const nonpublishedArticles = await prisma.article.count({
    where: {
      isPublished: false,
    },
  });
  const edit_required = await prisma.article.count({
    where: {
      edit_required: true,
    },
  });
  const totalUsers = await prisma.user.count();
  const totalAdmins = await prisma.user.count({
    where: {
      role: 'admin',
    },
  });
  const totalEditors = await prisma.user.count({
    where: {
      role: 'editor',
    },
  });
  const regularUsers = await prisma.user.count({
    where: {
      role: 'user',
    },
  });
  const siteVisits = await prisma.count.findUnique({
    where: {
      id: process.env.SITE_COUNT_ID,
    },
  });

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
  const articlesList = await prisma.article.findMany();
  res.json({
    message: 'ADMIN: Article List',
    articlesList,
  });
});

// Handle GET article by ID for ADMIN
exports.admin_articles_get = asyncHandler(async (req, res, next) => {
  const selectedArticle = await prisma.article.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
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
    const article = {
      article_title: req.body.article_title,
      article_summary: req.body.article_summary,
      author: req.body.author,
      article_text: req.body.article_text,
      isPublished: req.body.isPublished,
      main_image: req.file.filename,
    };

    if (!errors.isEmpty()) {
      res.json({
        message: 'Validation errors',
        article,
        errors: errors.array(),
      });
      return;
    } else {
      const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader
          .upload_stream(
            {
              unique_filename: true,
              asset_folder: `blog_api/${req.user.id}`,
            },
            (error, uploadResult) => {
              if (error) {
                next(error);
              }
              return resolve(uploadResult);
            },
          )
          .end(req.file.buffer);
      });

      await prisma.article.create({
        data: {
          article_title: req.body.article_title,
          author: req.body.author,
          article_summary: req.body.article_summary,
          article_text: req.body.article_text,
          isPublished: req.body.isPublished,
          main_image: uploadResult.secure_url,
        },
      });
      res.json({
        message: `${req.body.article_title} was created`,
      });
    }
  }),
];

// Handle article body image upload and returns file name
exports.admin_article_image_upload = asyncHandler(async (req, res, next) => {
  const uploadResult = await new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream(
        {
          unique_filename: true,
          asset_folder: `blog_api/${req.user.id}`,
        },
        (error, uploadResult) => {
          if (error) {
            next(error);
          }
          return resolve(uploadResult);
        },
      )
      .end(req.file.buffer);
  });

  res.json({
    location: uploadResult.secure_url,
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
    const articleToDelete = await prisma.article.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    const article = {
      article_title: req.body.article_title,
      article_text: req.body.article_text,
      article_summary: req.body.article_summary,
      edited_by: req.body.edited_by,
      main_image: req.body.main_image,
      id: req.body.id,
    };

    const articleImages = helpers.getImageLink(articleToDelete.article_text);

    if (!errors.isEmpty()) {
      res.json({
        article,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedArticle = article;
      const updatedArticleImages = helpers.getImageLink(
        updatedArticle.article_text,
      );

      if (
        articleToDelete.main_image !==
        (null | '' | updatedArticle.main_image)
      ) {
        const temp = articleToDelete.main_image.split('/');
        updatedArticleImages.push(temp[temp.length - 1].split('.')[0]);
      }

      const difference = updatedArticleImages.filter(
        (element) => !articleImages.includes(element),
      );

      await cloudinary.api
        .delete_resources(difference)
        .then((result) => console.log(result));
      await prisma.article.update({
        where: {
          id: parseInt(req.body.id),
        },
        data: {
          article_title: updatedArticle.article_title,
          article_text: updatedArticle.article_text,
          article_summary: updatedArticle.article_summary,
          edited_by: updatedArticle.edited_by,
          main_image: updatedArticle.main_image,
        },
      });
      res.json({
        message: 'ADMIN: Edit article',
      });
    }
  }),
];

// Handle publish and unpublishing of articles
exports.admin_articles_publish = asyncHandler(async (req, res, next) => {
  await prisma.article.update({
    where: {
      id: parseInt(req.body.id),
    },
    data: {
      isPublished: req.body.isPublished,
    },
  });
  res.json({
    message: 'Article publishing updated',
  });
});

// Handle DELETE to delete selected article
exports.admin_articles_delete = asyncHandler(async (req, res, next) => {
  const articleToDelete = await prisma.article.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  const articleImages = helpers.getImageLink(articleToDelete.article_text);

  if (articleToDelete.main_image !== (null | '')) {
    const temp = articleToDelete.main_image.split('/');
    articleImages.push(temp[temp.length - 1].split('.')[0]);
  }

  if (!articleToDelete) {
    res.sendStatus(404);
  } else {
    await cloudinary.api
      .delete_resources(articleImages)
      .then((result) => console.log(result));
    await prisma.article.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({
      message: `${articleToDelete.article_title} DELETED`,
    });
  }
});

// Get Users List
exports.admin_user_list = asyncHandler(async (req, res, next) => {
  const userList = await prisma.user.findMany();

  if (!userList) {
    res.sendStatus(404);
  } else {
    res.json({
      message: 'User List By Last Name',
      users: userList,
    });
  }
});
