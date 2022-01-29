const cnn = require('../db.connection');

const Order = function (order) {
  this.userId = order.userId;
  this.status = order.status;
  this.type = order.type;
  this.total = order.total;
};

Order.create = (newOrder, result) => {
  cnn.query('INSERT INTO orders SET ?', newOrder, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created order: ', { id: res.insertId, ...newOrder });

    result(null, { id: res.insertId, ...newOrder });
  });
};

Order.getAll = (result) => {
  let query = `SELECT o.status, o.type, o.userId, u.fullname, u.address, ol.orderId, SUM(ol.total) total
 FROM orderslines ol, orders o, users u
WHERE ol.orderId = o.id
  AND u.id = o.userId
GROUP BY ol.orderId;`;
  cnn.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Order.findById = (id, result) => {
  const query = `SELECT ol.orderId, p.name, p.price
FROM orderslines ol, products p
WHERE ol.productId = p.id
  AND ol.orderId = ${id}`;

  cnn.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    // console.log('product: ', { res });
    result(null, res);
  });
};

Order.deleteById = (id, result) => {
  let query = `DELETE FROM orders WHERE id = ${id}`;
  cnn.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('order: ', { res });
    result(null, { id: id });
  });
};

module.exports = Order;
