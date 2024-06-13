require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const multer = require('multer');

const storage = multer.diskStorage({
  // Define destination to save the image file
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },

  // Create a new file name with extension(nameSplit[1]) and unique identififer (uniqueSuffix).
  // All spaces are also replaced with an underscore '_'
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const nameSplit = file.originalname
      .toLowerCase()
      .replace(/ /g, '_')
      .split('.');
    cb(null, nameSplit[0] + '-' + uniqueSuffix + '.' + nameSplit[1]);
  },
});

const upload = multer({ storage: storage });

// Required controller(s)
const admin_controller = require('../controllers/adminController');

// Passport-JWT strategy configuration
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    },
  ),
);

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
  verifyRole,
  upload.single('articleTextImageUpload'),
  admin_controller.admin_article_image_upload,
);

// Admin article update
router.put(
  '/articles/:id',
  verifyRole,
  upload.single('articleTextImageUpload'),
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

module.exports = router;
