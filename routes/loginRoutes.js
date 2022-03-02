const express = require('express');
const rescue = require('express-rescue');

const { validateEmail,
  validateFields, validatePassword,
  login } = require('../controllers/userController');

const loginRouter = express.Router();

loginRouter.post('/', rescue(validateEmail, validatePassword, validateFields, login));

module.exports = loginRouter;