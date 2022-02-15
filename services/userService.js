const { User } = require('../models');
const { errors, blankedField, emptyField } = require('../helpers/validateFields');

const validateEmail = (email) => {
  switch (true) {
    case blankedField(email): return { code: 400, message: errors.blankedEmail };
    case emptyField(email): return { code: 400, message: errors.emptyEmail };
    default: return false;
  }
};

const validatePassword = (password) => {
  switch (true) {
    case blankedField(password): return { code: 400, message: errors.blankedPassword };
    case emptyField(password): return { code: 400, message: errors.emptyPassword };
    default: return false;
  }
};

const validateFields = async (email, password) => {
  const validUser = await User.findOne({ where: { email, password } });
  if (!validUser) {
    return { code: 400, message: errors.invalidFields };
  }
  return false;
};

const validateUser = async (userInfos) => {
  try {
    const { displayName, email, password, image } = userInfos;
    const user = await User.create({ displayName, password, email, image });
    return user;
  } catch (error) {
    return error;
  }
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

module.exports = {
  validateUser,
  validateEmail,
  validatePassword,
  validateFields,
  getAllUsers,
  getUserById,
};