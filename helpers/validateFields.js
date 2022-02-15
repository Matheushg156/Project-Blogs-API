/* Funções de validação do proprio sequelize
Source: https://sequelize.org/master/manual/validations-and-constraints.html#-code-allownull--code--interaction-with-other-validators */

const errors = {
  blankedEmail: '"email" is required',
  emptyEmail: '"email" is not allowed to be empty',
  blankedPassword: '"password" is required',
  emptyPassword: '"password" is not allowed to be empty',
  invalidFields: 'Invalid fields',
};

const blankedField = (field) => (!field && field !== '');

const emptyField = (field) => (field === '');

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
    msg: '"password" length must be 6 characters long',
  },
};

const titleValidator = {
  notNull: {
    msg: '"title" is required',
  },
};

const contentValidator = {
  notNull: {
    msg: '"content" is required',
  },
};

module.exports = {
  displayNameValidator,
  emailValidator,
  passwordValidator,
  errors,
  blankedField,
  emptyField,
  titleValidator,
  contentValidator,
};