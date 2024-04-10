const express = require('express');
const router = express.Router();

// Required controller(s)
const articles_controller = require('../controllers/articlesController');


///////////////////////////////////////////////////////////////
/////////////////////// Article Routing ///////////////////////
///////////////////////////////////////////////////////////////

// GET article listing
router.get('/', articles_controller.articles_list_get);

// Create a new article
router.post('/', articles_controller.articles_post);

// GET single article
router.get('/:id', articles_controller.article_get);

// Update an article
router.put('/:id', articles_controller.update_article_put);

// Delete an article
router.delete('/:id', articles_controller.delete_article);


///////////////////////////////////////////////////////////////
/////////////////////// Comment Routing ///////////////////////
///////////////////////////////////////////////////////////////


// GET Article comments
router.get('/:id/comments', articles_controller.article_comments_get);

// Create a comment
router.post('/:id/comments/', articles_controller.article_comments_post);


// GET single comment from article
router.get('/:id/comments/:id', articles_controller.comment_get);


module.exports = router;
