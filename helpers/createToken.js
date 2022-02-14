const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user.email }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = createToken;