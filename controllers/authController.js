const User = require('../models/userMode');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');
exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const user = User.create({
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
  });
  (await user).save;
  res.status(201).json(user);
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError('User Not Found. Please Sign up.', 404));
  }

  const token = generateToken(user.id);

  res.status(200).json({
    status: 'success',
    data: {
      token,
      user,
    },
  });
});
