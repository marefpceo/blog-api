require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const articlesRouter = require('./routes/articlesRoute');
const commentsRouter = require('./routes/commentsRoute');
const authRouter = require('./routes/authRoute');

const app = express();

// Set up db connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;

main().catch(err => console.log(err));
mongoose.set('strictQuery', false);

async function main() {
  await mongoose.connect(mongoDB);
}

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

app.use(passport.authenticate('session'));

app.use('/articles', [articlesRouter, commentsRouter]);
app.use('/auth', authRouter);

// Catch 404 and forward to error handler 
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
