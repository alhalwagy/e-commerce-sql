const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');
const Category = require('../models/categoryModel');

exports.addCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll();
  res.status(200).json(categories);
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return next(
      new AppError(`No category with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(category);
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const [rowsUpdated, [updatedCategory]] = await Category.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  });
  if (!updatedCategory) {
    return next(
      new AppError(`No category with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(updatedCategory);
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.destroy({ where: { id: req.params.id } });
  if (!category) {
    return next(
      new AppError(`No category with this id: ${req.params.id}`, 404)
    );
  }
  res.status(204).send();
});
