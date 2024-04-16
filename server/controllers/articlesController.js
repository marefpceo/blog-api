const asyncHandler = require('express-async-handler');

// Required models
const Article = require('../models/articleModel');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');


// Display article listing
exports.articles_list_get = asyncHandler(async (req, res, next) => {
  const articles = await Article.find({ isPublished: true }).sort({ timestamp: 1 }).exec();
  res.json(articles);
});

// Display selected article
exports.article_get = asyncHandler(async (req, res, next) => {
  const selectedArticle = await Article.findById(req.params.id).exec();

  if(!selectedArticle.isPublished) {
    res.sendStatus(403);
  } else {
    res.json(selectedArticle);
  }
});
