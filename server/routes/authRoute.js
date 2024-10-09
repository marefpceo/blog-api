require('dotenv').config();

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const auth_controller = require('../controllers/authController');

// Required model(s)
const User = require('../models/userModel');

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

// Passport-local strategy configuration
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Login
router.post(
  '/login',
  passport.authenticate('local', {
    failureMessage: true,
  }),
  function (req, res) {
    jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        role: req.user.role,
      },
      `${process.env.SECRET}`,
      (err, token) => {
        if (err) {
          next(err);
        } else {
          res.json({
            token,
            username: req.user.username,
          });
        }
      },
    );
  },
);

// Sign up
router.post('/signup', auth_controller.sign_up_post);

module.exports = router;
