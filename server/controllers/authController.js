const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Required model
const User = require('../models/userModel');

// Handle signup POST to create new user
exports.sign_up_post = [
  body('first_name')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('First Name must contain at least 3 characters')
    .escape(),
  body('last_name')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Last Name must contain at least 3 characters')
    .escape(),
  body('email')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Email must contain at least 3 characters')
    .escape(),
  body('username')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Username must contain at least 3 characters')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Password must contain at least 3 characters')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    if(!errors.isEmpty()) {
      res.json({
        user: user,
        errors: errors.array()
      });
      return;
    } else {
      await user.save();
      res.json({
        message: `${user.username} was created`
      })
    }
})];