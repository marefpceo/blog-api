require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');
const JWTstrategy  = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// Required controller(s)
const comments_controller = require('../controllers/commentsController');


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

// GET Article comments
router.get('/:id/comments', comments_controller.article_comments_get);

// GET single comment from article
router.get('/:id/comments/:id', passport.authenticate('jwt', { session: false }), comments_controller.comment_get);

// DELETE single comment from article
router.delete('/:id/comments/:id', passport.authenticate('jwt', { session: false }), comments_controller.comment_delete);

// POST Comment to selected article
router.post('/:id/comment_post', passport.authenticate('jwt', { session: false }), comments_controller.comment_post);

module.exports = router;
