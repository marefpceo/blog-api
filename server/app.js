const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const commentsRouter = require('./routes/comments');
const articlesRouter = require('./routes/articles');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/comments', commentsRouter);
app.use('/articles', articlesRouter);

module.exports = app;
