const asyncHandler = require('express-async-handler');

// Required models
const Article = require('../models/article');
const Comment = require('../models/comment');


///////////////////////////////////////////////////////////////
/////////////////////// Article Controls //////////////////////
///////////////////////////////////////////////////////////////

// Display article listing
exports.articles_get = asyncHandler(async (req, res, next) => {
  res.json('Article List');
});

// Handle create new article
exports.articles_post = asyncHandler(async (req, res, next) => {
  res.json('Create new article');
});

// Display selected article
exports.article_get = asyncHandler(async (req, res, next) => {
  res.json('Display selected article by id');
});

// Update selected article
exports.update_article_put = asyncHandler(async (req, res, next) => {
  res.json('Updated selected article by id');
});

// Delete selected article
exports.delete_article = asyncHandler(async (req, res, next) => {
  res.json('Delete selected article by id');
});


///////////////////////////////////////////////////////////////
/////////////////////// Comment Controls //////////////////////
///////////////////////////////////////////////////////////////

// Display Article comments
exports.article_comments_get = asyncHandler(async (req, res, next) => {
  res.json('All comments from article');
});

// Create a comment
exports.article_comments_post = asyncHandler(async (req, res, next) => {
  res.json('Post new comment');
});

// View single comment 
exports.comment_get = asyncHandler(async (req, res, next) => {
  res.json('Single comment from article');
});
