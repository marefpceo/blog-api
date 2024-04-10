require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const articlesRouter = require('./routes/articlesRoute');

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

app.use('/articles', articlesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


module.exports = app;
