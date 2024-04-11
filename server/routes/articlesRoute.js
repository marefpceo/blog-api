const express = require('express');
const router = express.Router();

// Required controller(s)
const articles_controller = require('../controllers/articlesController');

// GET article listing
router.get('/', articles_controller.articles_list_get);

// GET single article
router.get('/:id', articles_controller.article_get);

module.exports = router;
