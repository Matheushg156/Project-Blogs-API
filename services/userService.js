const { User } = require('../models');

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
};