const Product = require('../models/product.model');

exports.create = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      status: 'fail',
      message: 'body not found',
    });
  }

  await Product.create(req.body, (err, data) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data,
    });
  });
  // next();
};

exports.findAll = async (req, res, next) => {
  await Product.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data,
    });
  });
  // next();
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;

  await Product.findById(id, (err, data) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        error: err.message,
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
  next();
};

exports.updateOne = async (req, res, next) => {
  const { id } = req.params;

  await Product.updateById(id, req.body, (err, data) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        error: err.message,
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
  next();
};

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;

  await Product.deleteOne(id, (err, data) => {
    if (err) {
      res.status(204).send();
      return;
    }

    res.status(200).json({
      status: 'success',
      data,
    });
  });
  next();
};
