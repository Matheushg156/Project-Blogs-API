const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserServices = require('../services/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const user = await UserServices.validateUser({ displayName, email, password, image });
  if (!user.errors) {
    const token = jwt.sign({ data: user.email }, process.env.JWT_SECRET, jwtConfig);
    res.status(201).json({ token });
  } else if (user.errors[0].type === 'unique violation') {
    res.status(409).json({ message: 'User already registered' });
  } else {
    res.status(400).json({ message: user.errors[0].message });
  }
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const isEmailInvalid = UserServices.validateEmail(email);
  if (isEmailInvalid) {
    return res.status(isEmailInvalid.code).json({ message: isEmailInvalid.message });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const isPasswordInvalid = UserServices.validatePassword(password);
  if (isPasswordInvalid) {
    return res.status(isPasswordInvalid.code).json({ message: isPasswordInvalid.message });
  }
  next();
};

const validateFields = async (req, res, next) => {
  const { email, password } = req.body;
  const isFildesValid = await UserServices.validateFields(email, password);
  if (isFildesValid) {
    return res.status(isFildesValid.code).json({ message: isFildesValid.message });
  }
  next();
};

module.exports = {
  createUser,
  validateEmail,
  validatePassword,
  validateFields,
};