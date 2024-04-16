require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');
const JWTstrategy  = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

// Required controller(s)
const admin_controller = require('../controllers/adminController');


// Passport-JWT strategy configuration
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {
        return done(null, token);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Middleware function to verify Admin role
function verifyRole(req, res, next) {
  const role = jwt.verify(req.headers['authorization'].split(' ')[1], process.env.SECRET).role;

  if (role !== 'Admin') {
    res.sendStatus(401);
  } else {
    next();
  }
};


// Admin dashboard
router.get('/', verifyRole, admin_controller.admin_get);

// Admin article list shows published and unpublished
router.get('/articles', verifyRole, admin_controller.admin_articles_list_get);

// Admin get article by ID
router.get('/articles/:id', verifyRole, admin_controller.admin_articles_get);

// Admin article create
router.post('/articles', verifyRole, admin_controller.admin_articles_post);

// Admin article update
router.put('/articles/:id', verifyRole, admin_controller.admin_articles_put);

// Admin article delete
router.delete('/articles/:id', verifyRole, admin_controller.admin_articles_delete);

module.exports = router;
