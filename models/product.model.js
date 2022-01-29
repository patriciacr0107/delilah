const cnn = require('../db.connection');

const Product = function (product) {
  this.name = product.name;
  this.price = product.price;
};

Product.create = (newProduct, result) => {
  cnn.query('INSERT INTO products SET ?', newProduct, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created product: ', { id: res.insertId, ...newProduct });

    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.getAll = (result) => {
  cnn.query('SELECT * FROM products', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Product.findById = (id, result) => {
  const query = `SELECT * FROM products WHERE id = ${id}`;

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

Product.updateById = (id, product, result) => {
  cnn.query(
    `UPDATE products SET name = ?, price = ? WHERE id = ?`,
    [product.name, product.price, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('product: ', { res });
      result(null, { id: id, ...product });
    }
  );
};

Product.deleteOne = (id, result) => {
  cnn.query('DELETE FROM products WHERE id = ?', Number(id), (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.changedRows === 0) {
      result('not found', null);
      return;
    }

    console.log('product: ', { res });
    result(null, { id: id });
  });
};

module.exports = Product;
