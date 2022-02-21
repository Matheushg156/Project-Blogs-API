const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/userRotes');

const { validateEmail,
  validateFields, validatePassword,
  login } = require('./controllers/userController');
const { createCategory, getCategories } = require('./controllers/categoriesController');
const { validateCategoriesId,
  createBlogPost, getAllBlogPosts } = require('./controllers/blogPostsController');
const validateToken = require('./helpers/validateToken');

const app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);

app.post('/login', validateEmail, validatePassword, validateFields, login);
app.post('/categories', validateToken, createCategory);
app.get('/categories', validateToken, getCategories);
app.post('/post', validateToken, validateCategoriesId, createBlogPost);
app.get('/post', validateToken, getAllBlogPosts);

module.exports = app;