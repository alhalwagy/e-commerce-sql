const { Sequelize, Model, DataTypes } = require('sequelize');
const db = require('../DB/db');
const bcrypt = require('bcrypt');
const syncDatabase = require('../DB/asyncDb');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: 'user',
    tableName: 'users',
  }
);

User.beforeSave(async (user, options) => {
  if (user.changed('password')) {
    const hashPassword = await bcrypt.hash(user.password, 12);
    user.password = hashPassword;
  }
});
syncDatabase();
module.exports = User;
