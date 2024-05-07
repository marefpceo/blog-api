require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const debug = require('debug')('connection');

const articlesRouter = require('./routes/articlesRoute');
const commentsRouter = require('./routes/commentsRoute');
const authRouter = require('./routes/authRoute');
const adminRouter = require('./routes/adminRoute');

const app = express();

// Set up db connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;

main().catch(err => debug(`DB Connection error ${err}`));
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
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 1 * 24 * 60 * 60,
    collectionName: 'sessions',
    autoRemove: 'disabled',
    touchAfter: 24 * 3600,
  })
}));

app.use(passport.authenticate('session'));

app.use('/articles', articlesRouter);
app.use('/articles', commentsRouter);
app.use('/auth', authRouter);
app.use('/admin', passport.authenticate('jwt', { session: false }), adminRouter);


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
  res.json(err);
});

module.exports = app;
