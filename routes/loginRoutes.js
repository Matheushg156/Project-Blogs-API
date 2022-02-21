const express = require('express');

const { validateEmail,
  validateFields, validatePassword,
  login } = require('../controllers/userController');

const loginRouter = express.Router();

loginRouter.post('/', validateEmail, validatePassword, validateFields, login);

module.exports = loginRouter;