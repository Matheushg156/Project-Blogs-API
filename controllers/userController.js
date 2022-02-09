const UserServices = require('../services/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await UserServices.validateUser({ displayName, email, password, image });
  if (user.errors[0].message === 'email must be unique') {
    return res.status(409).json({ message: 'User already registered' });
  }
  if (user.errors) {
    return res.status(400).json({ message: user.errors[0].message });
  }
  res.status(201).json(user);
};

module.exports = {
  createUser,
};