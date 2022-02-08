const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await User.create({ displayName, password, email, image });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error.errors[0].path);
    /* if (error.erros.path === 'displayName') {
    res.status(500).json(error.erros.message);
    } */
  }
};

module.exports = {
  createUser,
};