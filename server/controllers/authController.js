const asyncHandler = require('express-async-handler');

// Required model
const User = require('../models/userModel');

// Handle signup POST to create new user
exports.sign_up_post = asyncHandler(async (req, res, next) => {
  res.json('sign up');
});