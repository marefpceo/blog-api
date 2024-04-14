require('dotenv').config();

const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// Required model(s)
const User = require('../models/userModel');

// Passport-local strategy configuration
passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if(!user) {
          return done(null, false, { message: 'Incorrect email'});
        }
        
        const passwordsMatch = await bcrypt.compare(
          password, user.password,
        );
        if(passwordsMatch) {        
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect password'});
        }
      } catch(err) {
        return done(err);
      }
    }
  )
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) =>{ 
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  };
});


router.get('/', (req, res, next) => {
  res.json('Auth Route');
});

router.post('/tokentest', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Token test passed',
        authData,
        user: req.user,
      });
    }
  });
  
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Call next
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};


// Login 
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth'}),

  function(req, res) {
    jwt.sign({ email: req.email}, process.env.SECRET, { expiresIn: '4h' }, (err, token) => {
      if(err) {
        return next(err);
      } else {
        res.json({
          token
        });
      }
    });
  }
);

module.exports = router;
