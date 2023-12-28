const catchAsync = require('../utils/catchAsync');

const AppError = require('../utils/appError');
const SubCategory = require('../models/subCategoryModel');
const Category = require('../models/categoryModel');

exports.addSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.create(req.body);
  res.status(201).json(subCategory);
});

exports.getSubCategories = catchAsync(async (req, res, next) => {
  const subCategories = await SubCategory.findAll({
    include: [
      {
        model: Category,
        as: 'category', // optional alias for the included model
        attributes: ['id', 'name', 'image'],
      },
    ],
  });
  if (!subCategories) {
    return next(new AppError('There is no sub categories', 404));
  }
  res.status(200).json(subCategories);
});

exports.getSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.findByPk(req.params.id);
  if (!subCategory) {
    return next(
      new AppError(`No category with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(subCategory);
});

exports.updateSubCategory = catchAsync(async (req, res, next) => {
  const [rowsUpdated, [updatedSubCategory]] = await SubCategory.update(
    req.body,
    {
      where: { id: req.params.id },
      returning: true,
    }
  );
  if (!updatedSubCategory) {
    return next(
      new AppError(`No SubCategory with this id: ${req.params.id}`, 404)
    );
  }
  res.status(200).json(updatedSubCategory);
});

exports.deleteSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await SubCategory.destroy({
    where: { id: req.params.id },
  });
  if (!subCategory) {
    return next(
      new AppError(`No SubCategory with this id: ${req.params.id}`, 404)
    );
  }
  res.status(204).send();
});
