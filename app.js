const express = require('express');
const bodyParser = require('body-parser');

const { createUser, validateEmail,
  validateFields, validatePassword, login } = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());

app.route('/user').post(createUser);
app.post('/login', validateEmail, validatePassword, validateFields, login);

module.exports = app;