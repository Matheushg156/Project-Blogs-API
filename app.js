const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routes/userRotes');
const categoriesRouter = require('./routes/categoriesRoutes');

const { validateEmail,
  validateFields, validatePassword,
  login } = require('./controllers/userController');
const { validateCategoriesId,
  createBlogPost, getAllBlogPosts } = require('./controllers/blogPostsController');
const validateToken = require('./helpers/validateToken');

const app = express();

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/categories', categoriesRouter);

app.post('/login', validateEmail, validatePassword, validateFields, login);
app.post('/post', validateToken, validateCategoriesId, createBlogPost);
app.get('/post', validateToken, getAllBlogPosts);

module.exports = app;