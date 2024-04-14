const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const router = express.Router();

// Required model(s)
const User = require('../models/userModel');

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  }
  ,async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if(!user) {
        return done(null, false, { message: 'Incorrect email'});
      }
      
      const passwordsMatch = await bcrypt.compare(
        password, user.password,
      );
      if(passwordsMatch) {
        // Possible location for assigning JWT token

      
        return done(null, user);
      } else {
        return done(null, false, {message: 'Incorrect password'});
      }
    } catch(err) {
      return done(err);
    }
}));

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, user.id);
  });
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


// Login 
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth'}),
  function(req, res) {
    res.json(req.session);
  }
);

module.exports = router;
