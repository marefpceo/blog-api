require('dotenv').config();

const express = require('express');
const router = express.Router();

// Required models
const SiteCount = require('../models/siteCount');

// Required controller(s)
const articles_controller = require('../controllers/articlesController');

// Site count function
function siteCountUp(req, res) {
  SiteCount.findByIdAndUpdate(
    `${process.env.SITE_COUNT_ID}`,
    { $inc: { count_total: 1, weekly_count: 1 } },
    { new: true },
  ).exec();
  res.json({
    message: 'Count added'
  });
}

// GET site visitor count
router.get('/count', siteCountUp);

// GET article listing
router.get('/', articles_controller.articles_list_get);

// GET single article
router.get('/:id', articles_controller.article_get);

module.exports = router;
