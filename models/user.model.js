const cnn = require('../db.connection');

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.fullname = user.fullname;
  this.phone = user.phone;
  this.address = user.address;
  this.role = user.role;
};

User.create = (newUser, result) => {
  cnn.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    delete newUser.password;

    result(null, { id: res.insertId, ...newUser });
  });
};

User.getAll = (result) => {
  let query = 'SELECT fullname, username, phone, address, role FROM users';

  cnn.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

User.findCredencials = (username, password, result) => {
  const query = `SELECT id, username, fullname, phone, address, role FROM users WHERE username = '${username}' AND password = '${password}'`;

  cnn.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

User.findById = (id, result) => {
  const query = `SELECT id, username, fullname, phone, address, role FROM users WHERE id = ${id}`;

  cnn.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

module.exports = User;
