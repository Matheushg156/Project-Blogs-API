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
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);
    res.status(201).json({ token });
  } else if (user.errors[0].message === 'email must be unique') {
    res.status(409).json({ message: 'User already registered' });
  } else {
    res.status(400).json({ message: user.errors[0].message });
  }
};

module.exports = {
  createUser,
};