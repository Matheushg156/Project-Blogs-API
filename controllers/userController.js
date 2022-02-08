const UserServices = require('../services/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await UserServices.validateUser({ displayName, email, password, image });
  if (user.errors) {
    res.status(400).json({ message: user.errors[0].message });
  } else {
    res.status(201).json(user);
  }
};

module.exports = {
  createUser,
};