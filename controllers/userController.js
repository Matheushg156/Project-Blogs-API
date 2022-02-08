const { User } = require('../models');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await User.create({ displayName, password, email, image });
  res.send(user);
};

module.exports = {
  createUser,
};