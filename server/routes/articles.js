const express = require('express');
const router = express.Router();

// GET article listing
router.get('/', function(req, res, next) {
  res.json('Article List');
});

// Create a new article
router.post('/', (req, res, next) => {
  res.json('Create new article');
});

// GET single article
router.get('/:articleId', (req, res, next) => {
  res.json('Display an article');
});

// Update an article
router.put('/:articleId', (req, res, next) => {
  res.json('Update article');
});

// Delete an article
router.delete('/:articleId', (req, res, next) => {
  res.json('Delete article');
});


module.exports = router;