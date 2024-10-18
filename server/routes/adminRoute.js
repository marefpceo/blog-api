require('dotenv').config();

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Required controller(s)
const admin_controller = require('../controllers/adminController');

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

// Admin dashboard
router.get('/', verifyRole, admin_controller.admin_get);

// Admin article list shows published and unpublished
router.get('/articles', verifyRole, admin_controller.admin_articles_list_get);

// Admin get article by ID
router.get('/articles/:id', verifyRole, admin_controller.admin_articles_get);

// Admin article create
router.post(
  '/articles',
  [verifyRole, upload.single('main_image')],
  admin_controller.admin_articles_post,
);

// Admin article image upload
router.post(
  '/articles/upload',
  [verifyRole, upload.single('articleTextImageUpload')],
  admin_controller.admin_article_image_upload,
);

// Admin article update
router.put(
  '/articles/:id',
  [verifyRole, upload.single('articleTextImageUpload')],
  admin_controller.admin_articles_put,
);

// Admin article publish/ unpublish
router.put(
  '/articles/:id/publish',
  verifyRole,
  admin_controller.admin_articles_publish,
);

// Admin article delete
router.delete(
  '/articles/:id',
  verifyRole,
  admin_controller.admin_articles_delete,
);

// Admin User's List
router.get('/users', verifyRole, admin_controller.admin_user_list);

module.exports = router;
