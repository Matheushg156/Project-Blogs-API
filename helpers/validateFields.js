const displayNameValidator = {
  notEmpty: true,
  len: {
    args: [8, 255],
    msg: '"displayName" length must be at least 8 characters long',
  },
};

const emailValidator = {
  notEmpty: true,
  isEmail: {
    msg: '"email" must be a valid email',
  },
  unique: {
    args: {
      model: 'Users',
      field: 'email',
    },
    msg: 'User already registeredd',
  },
  notNull: {
    msg: '"email" is required',
  },
};

const passwordValidator = {
  notEmpty: true,
  notNull: {
    msg: '"password" is required',
  },
  len: {
    args: [6],
    msg: '"password" length must be at least 6 characters long',
  },
};

module.exports = {
  displayNameValidator,
  emailValidator,
  passwordValidator,
};