const asyncHandler = require('express-async-handler');

// Required models
const Article = require('../models/article');
const Comment = require('../models/comment');


///////////////////////////////////////////////////////////////
/////////////////////// Article Controls //////////////////////
///////////////////////////////////////////////////////////////

// Display article listing
exports.articles_list_get = asyncHandler(async (req, res, next) => {
  const articles = await Article.find().sort({ timestamp: 1 })
    .populate({ path: 'comments'});
  res.json(articles);
});

// Display selected article
exports.article_get = asyncHandler(async (req, res, next) => {
  const selectedArticle = await Article.findById(req.params.id).populate({ path: 'comments' });
  res.json(selectedArticle);
});



// Handle create new article
exports.articles_post = asyncHandler(async (req, res, next) => {
  res.json('Create new article');
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
  const comments = await Comment.find({ comment_article: req.params.id }).sort({ timestamp: 1 });
  res.json(comments);
});

// View single comment 
exports.comment_get = asyncHandler(async (req, res, next) => {
  const selectedComment = await Comment.findById(req.params.id);
  res.json(selectedComment);
});


// Create a comment
exports.article_comments_post = asyncHandler(async (req, res, next) => {
  res.json('Post new comment');
});