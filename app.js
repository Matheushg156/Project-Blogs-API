const express = require('express');
const bodyParser = require('body-parser');

const { createUser, validateEmail,
  validateFields, validatePassword,
  login, getAllUsers, getUserById } = require('./controllers/userController');
const { createCategory, getCategories } = require('./controllers/categoriesController');
const { findCategoriesByIds, createBlogPost } = require('./controllers/blogPostsController');
const validateToken = require('./helpers/validateToken');

const app = express();

app.use(bodyParser.json());

app.post('/user', createUser);
app.get('/user', validateToken, getAllUsers);
app.get('/user/:id', validateToken, getUserById);
app.post('/login', validateEmail, validatePassword, validateFields, login);
app.post('/categories', validateToken, createCategory);
app.get('/categories', validateToken, getCategories);
app.post('/post', validateToken, findCategoriesByIds, createBlogPost);

module.exports = app;