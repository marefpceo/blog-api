#! /usr/bin/env node

console.log(
  'This script populate your database for testing. Specified database as argument - e.g.: node populatedb "mongodb+srv://<username>:<password>@cluster0.lz91hw2.mongodb.net/blog_api?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

// Required models 
const Article = require('./models/articleModel');
const Comment = require('./models/commentModel');
const User = require('./models/userModel');

// Array variables for documents
const articles = [];
const comments = [];
const users = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createArticles();
  await createUsers();
  await createComments();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// Create functions used to create new documents from models, saving to database
async function articleCreate(index, title, author, text, isPublished, date_published, 
  date_updated) {
  const article = new Article({
    article_title: title,
    author: author,
    article_text: text,
    isPublished: isPublished,
    date_published: date_published,
    date_updated: date_updated,
  });

  await article.save();
  articles[index] = article;
  console.log(`Added article: ${article.article_title}`);
}

async function commentCreate(index, title, text, article, user) {
  const comment = new Comment({
    comment_title: title,
    comment_text: text,
    comment_article: article,
    comment_user: user,
  });

  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${comment.comment_title}`);
}

async function userCreate(index, firstName, lastName, email, username, password, role, 
  isAdmin, status){
    const user = new User({
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      password: password, 
      role: role,
      isAdmin: isAdmin,
      status: status,
      created: Date.now(),
    });

    await user.save();
    users[index] = user;
    console.log(`Added user: ${username}`);
  }


async function createArticles() {
  console.log('Adding Articles');
  await Promise.all([
    articleCreate(0, 'Welcome to my Blog', 'L. Me', 'Thank you for visting my blog. I started this because. . .',
      false, '' , ''),
    articleCreate(1, 'Why I became a web dev', 'L. Me', 'I wanted to become a developer because. . .',
     false, '', ''),
    articleCreate(2, 'How to write a blog', 'L. Me', 'To write a blog you should start by. . .', 
      false, '', ''),
  ]);
}

async function createUsers() {
  console.log('Adding Users');
  await Promise.all([
    userCreate(0, 'System', 'Administrator', 'sa@blog.com', 'admin', 'kkkkkkkkk', 'Admin', true, 'ok'),
    userCreate(1, 'Article', 'Editor', 'ae@blog.com', 'admin', 'kkkkkkkkk', 'Admin', true, 'ok'),
    userCreate(2, 'user', 'one', 'user1@somewhere.com', 'user1', 'kkkkkkkkk', 'User', false, 'ok'),
    userCreate(3, 'user', 'two', 'user2@another.com', 'user2', 'kkkkkkkkk', 'User', false, 'ok'),
  ]);
}

async function createComments() {
  const articleList = await Article.find();
  const userList = await User.find();
  console.log('Adding comments');
  await Promise.all([
    commentCreate(0, 'Cool blog', 'Nice blog. Keep up the good work', `${articleList[0]._id}`, `${userList[2]._id}` ),
    commentCreate(1, 'Thank you', 'Very good reading material', `${articleList[1]._id}`, `${userList[3]._id}` ),
    commentCreate(2, 'Me too', 'I became a developer for the same reasons', `${articleList[1]._id}`, `${userList[2]._id}` ),
    commentCreate(3, 'Welcome', 'Thank you for your comments', `${articleList[1]._id}`, `${userList[1]._id}` ),
    commentCreate(4, 'Subscribers', 'Spread the word. I also accept feedback', `${articleList[2]._id}`, `${userList[0]._id}` ),
  ]);
}
