const { User } = require('../models');
const { errors, blankedField, emptyField } = require('../helpers/validateFields');

const validateEmail = (email) => {
  switch (true) {
    case blankedField(email): return { code: 400, message: errors.blankedEmail };
    case emptyField(email): return { code: 422, message: errors.emptyEmail };
    default: return false;
  }
};

const validatePassword = (password) => {
  switch (true) {
    case blankedField(password): return { code: 400, message: errors.blankedPassword };
    case emptyField(password): return { code: 422, message: errors.emptyPassword };
    default: return false;
  }
};

const validateFields = async (email) => {
  const validUser = await User.findOne({ where: email });
  if (!validUser) {
    return { code: 400, message: errors.emptyPassword };
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

module.exports = {
  validateUser,
  validateEmail,
  validatePassword,
  validateFields,
};