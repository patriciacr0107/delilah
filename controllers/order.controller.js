const Order = require('../models/order.model');
const OrderLines = require('../models/orderLines.model');
const Product = require('../models/product.model');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { JWT_SECRET, JWT_EXPIRES } = process.env;

exports.create = async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      status: 'fail',
      message: 'body not found',
    });
  }

  await Order.create(req.body, (err, data) => {
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

exports.createOrderLines = async (req, res, next) => {
  const { products, orderId } = req.body;
  const { body } = req;
  if (!req.body) {
    res.status(400).json({
      status: 'fail',
      message: 'body not found',
    });
  }

  try {
    for (let product of products) {
      await Product.findById(product, async (err, data) => {
        await OrderLines.createLines(
          orderId,
          product,
          data[0].price,
          (err, data) => {
            if (err) {
              res.status(500).json({
                status: 'error',
                error: err.message,
              });
              return;
            }
          }
        );
      });
    }
  } catch (error) {
    console.log('Error procesando ' + error);
  }

  res.status(200).json({
    status: 'success',
    data: body,
  });
};

exports.findAll = async (req, res, next) => {
  await Order.getAll((err, data) => {
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

  await OrderLines.findById(id, (err, data) => {
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
  // next();
};

exports.myOrders = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

  await Order.findById(decoded.user.id, (err, data) => {
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
  // next();
};

exports.deleteOrder = async (req, res, next) => {
  const { id } = req.params;

  await Order.deleteById(id, (err, data) => {
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
  // next();
};

exports.deleteLines = async (req, res, next) => {
  const { id } = req.params;

  await OrderLines.deleteById(id, (err, data) => {
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
  // next();
};
