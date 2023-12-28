const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');
const Product = require('../models/productModel');

exports.addProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});
