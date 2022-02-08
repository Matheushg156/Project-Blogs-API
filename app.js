const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());

app.post('/user', UserController.createUser);

module.exports = app;