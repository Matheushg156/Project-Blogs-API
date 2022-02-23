require('dotenv').config();
const UserServices = require('../services/userService');
const createToken = require('../helpers/createToken');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await UserServices.validateUser({ displayName, email, password, image });
  if (!user.errors) {
    const token = createToken(user.email);
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

const login = async (req, res) => {
  const { email } = req.body;
  const token = createToken(email);
  res.status(200).json({ token });
};

const getAllUsers = async (_req, res) => {
  const users = await UserServices.getAllUsers();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserServices.getUserById(id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: 'User does not exist' });
};

const deleteUser = async (req, res) => {
  const { dataValues: { id: userId } } = req.user;
  await UserServices.deleteUser(userId);
  res.status(204).end();
};

module.exports = {
  createUser,
  validateEmail,
  validatePassword,
  validateFields,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
};