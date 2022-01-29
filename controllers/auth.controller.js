const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { promisify } = require('util');

const { JWT_SECRET, JWT_EXPIRES } = process.env;

const signToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

const createToken = (user, statusCode, res) => {
  const token = signToken(user[0]);

  res.status(statusCode).json({
    status: 'succes',
    token,
    user,
  });
};

exports.restrictTo = (...roles) => {
  return async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

    if (!roles.includes(decoded.user.role)) {
      return next(new Error('no tiene permiso'));
    }
    next();
  };
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new Error('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, JWT_SECRET);
  } catch (error) {
    return next(
      new Error('You are not logged in! Please log in to get access.', 401)
    );
  }

  if (!decoded) {
    return next(
      new Error('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 3) Check if user still exists
  await User.findById(decoded.user.id, (err, data) => {
    if (!data[0].id) {
      return next(
        new Error('The user belonging to this token does no longer exist.', 401)
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = data[0];
    res.locals.user = data[0];
  });
  next();
};

exports.signIn = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(404).json({
      status: 'fail',
      message: 'no data found',
    });
    return;
  }

  await User.findCredencials(username, password, (err, data) => {
    if (err) {
      res.status(404).json({
        status: 'fail',
        message: 'no data found',
      });
      return;
    }

    if (data.length === 0) {
      res.status(204).send();
      return;
    }

    createToken(data, 200, res);
  });
};
