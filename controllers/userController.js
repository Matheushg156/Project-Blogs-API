const UserServices = require('../services/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await UserServices.validateUser({ displayName, email, password, image });
  if (!user.errors) {
    res.status(201).json(user);
  } else if (user.errors[0].message === 'email must be unique') {
    res.status(409).json({ message: 'User already registered' });
  } else {
    res.status(400).json({ message: user.errors[0].message });
  }
};

module.exports = {
  createUser,
};