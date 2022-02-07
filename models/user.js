const {
  displayNameValidator,
  emailValidator,
  passwordValidator, 
} = require('../helpers/validateFields');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: { type: DataTypes.STRING, allowNull: false, validate: displayNameValidator,
    },
    email: { type: DataTypes.STRING, allowNull: false, validate: emailValidator },
    password: { type: DataTypes.STRING, allowNull: false, validate: passwordValidator },
    image: DataTypes.STRING,
  },
  {
    tableName: 'Users', timestamps: false,
  });
  return User;
};