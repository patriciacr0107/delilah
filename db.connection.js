const mysql = require('mysql');

const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
});

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

connection.connect((error) => {
  if (error) throw error;
  console.log('Conexion correcta a la base de datos');
});

module.exports = connection;
