const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const debug = require('debug')('auth');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

// Required model
const User = require('../models/userModel');
const SiteCount = require('../models/siteCount');

// Site count function
function siteCountUp() {
  SiteCount.findByIdAndUpdate(
    `${process.env.SITE_COUNT_ID}`,
    { $inc: { weekly_user_count: 1 } },
    { new: true },
  ).exec();
}

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
    .isEmail()
    .withMessage('Not a valid e-mail address (example: my@email.com)')
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          email: value,
        },
      });
      if (user) {
        throw new Error('E-mail address already in use');
      }
    })
    .escape(),
  body('username')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Username must contain at least 3 characters')
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          username: value,
        },
      });

      if (user) {
        throw new Error('Username is already in use');
      }
    })
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Password must contain at least 3 characters')
    .escape(),
  body('confirm_password')
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords do not match')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    let user = Prisma.UserCreateInput;

    user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    if (!errors.isEmpty()) {
      debug(`Sign up validation error`);
      res.json({
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      user.password = bcrypt.hashSync(req.body.password, 10);
      await prisma.user.create({ data: user });
      // siteCountUp();
      debug(`${user.username} created`);
      res.json({
        message: `${user.username} was created`,
      });
    }
  }),
];
