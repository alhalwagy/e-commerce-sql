const { DataTypes, Model } = require('sequelize');
const db = require('../DB/db');
const asyncDb = require('../DB/asyncDb');
class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'category',
  }
);
asyncDb();
module.exports = Category;
