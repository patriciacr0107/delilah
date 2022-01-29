const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET } = process.env;

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      status: 'fail',
      message: 'body not found',
    });
  }

  await User.create(req.body, (err, data) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
      return;
    } else {
      res.status(200).json({
        status: 'success',
        data,
      });
    }
  });
};

exports.findAll = async (req, res) => {
  await User.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
      return;
    } else {
      res.status(200).json({
        status: 'success',
        data,
      });
    }
  });
};

exports.findMe = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

  await User.findById(decoded.user.id, (err, data) => {
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
    res.status(200).json({
      status: 'success',
      data,
    });
  });
};
