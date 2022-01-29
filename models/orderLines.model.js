const cnn = require('../db.connection');

const OrderLines = function (orderLines) {
  this.orderId = orderLines.orderId;
  this.productId = orderLines.productId;
  this.units = orderLines.units;
  this.total = orderLines.total;
};

OrderLines.createLines = (orderId, productId, total, result) => {
  let query = `INSERT INTO orderslines (orderId, productId, total) values(${orderId}, ${productId}, ${total})`;

  cnn.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created order: ', { id: res.insertId });

    result(null, { id: res.insertId });
  });
};

OrderLines.updateLines = (id, orderLines, result) => {
  cnn.query(
    `UPDATE orderslines SET units = ?, total = ? WHERE id = ?`,
    [orderLines.units, OrderLines.total, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('orderLines: ', { res });
      result(null, { id: id, ...orderslines });
    }
  );
};

OrderLines.findById = (id, result) => {
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

OrderLines.deleteById = (id, result) => {
  let query = `DELETE FROM orderslines WHERE id = ${id}`;
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

module.exports = OrderLines;
