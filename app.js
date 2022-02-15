const express = require('express');
const bodyParser = require('body-parser');

const { createUser, validateEmail,
  validateFields, validatePassword,
  login, getAllUsers, getUserById } = require('./controllers/userController');
const { createCategory } = require('./controllers/categoriesController');
const validateToken = require('./helpers/validateToken');

const app = express();

app.use(bodyParser.json());

app.post('/user', createUser);
app.get('/user', validateToken, getAllUsers);
app.get('/user/:id', validateToken, getUserById);
app.post('/login', validateEmail, validatePassword, validateFields, login);
app.post('/categories', validateToken, createCategory);

module.exports = app;