const { Model, DataTypes } = require('sequelize');
const db = require('../DB/db');
const asyncDb = require('../DB/asyncDb');
const Category = require('./categoryModel');
const SubCategory = require('./subcategoryModel');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize: db,
    modelName: 'product',
  }
);

Category.hasMany(Product, { foreignKey: 'category-id' });
Product.belongsTo(Category, { foreignKey: 'category-id' });

SubCategory.hasMany(Product, { foreignKey: 'subCategory-id' });
Product.belongsTo(SubCategory, { foreignKey: 'subCategory-id' });

asyncDb();

module.exports = Product;
