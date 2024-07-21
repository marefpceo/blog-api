require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Required controller(s)
const comments_controller = require('../controllers/commentsController');

// Middleware function to verify Admin role
function verifyRole(req, res, next) {
  const role = jwt.verify(
    req.headers['authorization'].split(' ')[1],
    process.env.SECRET,
  ).role;

  if (role !== 'admin') {
    res.sendStatus(401);
  } else {
    next();
  }
}

// GET Article comments
router.get('/:id/comments', comments_controller.article_comments_get);

// GET single comment from article
router.get(
  '/:id/comments/:commentId',
  verifyRole,
  comments_controller.comment_get,
);

// DELETE single comment from article
router.delete(
  '/:id/comments/:commentId',
  verifyRole,
  comments_controller.comment_delete,
);

// POST Comment to selected article
router.post('/:id/comment_post', comments_controller.comment_post);

module.exports = router;
