const express = require('express');
const bodyParser = require('body-parser');

const { createUser, validateEmail,
  validateFields, validatePassword, login, getAllUsers } = require('./controllers/userController');
const validateToken = require('./helpers/validateToken');

const app = express();

app.use(bodyParser.json());

app.post('/user', createUser);
app.get('/user', validateToken, getAllUsers);
app.post('/login', validateEmail, validatePassword, validateFields, login);

module.exports = app;