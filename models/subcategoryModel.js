const { DataTypes, Model } = require('sequelize');
const db = require('../DB/db');
const asyncDb = require('../DB/asyncDb');
const Category = require('./categoryModel');
class Subcategory extends Model {}

Subcategory.init(
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
    modelName: 'sub_category',
  }
);

asyncDb();
Category.hasMany(Subcategory, { foreignKey: 'category-id' });
Subcategory.belongsTo(Category, { foreignKey: 'category-id' });

module.exports = Subcategory;
