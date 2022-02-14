/* Funções de validação do proprio sequelize
Source: https://sequelize.org/master/manual/validations-and-constraints.html#-code-allownull--code--interaction-with-other-validators */

const errors = {
  blankedEmail: '"email" is required',
  emptyEmail: '"email" is not allowed to be empty',
  blankedPassword: '"password" is required',
  emptyPassword: '"password" is not allowed to be empty',
  invalidFields: 'invalid fields',
};

const blankedField = (field, msg) => {
  if (!field) return { code: 400, message: msg };
};

const emptyField = (field, msg) => {
  if (field === '') return { code: 400, message: msg };
};

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

module.exports = {
  displayNameValidator,
  emailValidator,
  passwordValidator,
  errors,
  blankedField,
  emptyField,
};