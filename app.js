const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./controllers/userController');

const app = express();

app.use(bodyParser.json());

app.route('/user').post(UserController.createUser);

module.exports = app;