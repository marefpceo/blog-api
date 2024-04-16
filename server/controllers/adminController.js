require('dotenv').config();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Required models
const User = require('../models/userModel');
const Article = require('../models/articleModel');
const Comment = require('../models/commentModel');


exports.admin_get = asyncHandler(async (req, res, next) => {
  // const selectedComment = await Comment.findById(req.params.id);
  // const role = jwt.verify(req.headers['authorization'].split(' ')[1], process.env.SECRET).role;
  res.json({
    message: 'Admin Dashboard'
  });
});


  
