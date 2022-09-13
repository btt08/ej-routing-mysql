const mysql = require('mysql2');
const config = require('./config');

module.exports =
  mysql.createConnection({
    host: config.DB_HOST,
    database: config.DB_NAME,
    user: config.DB_USER,
    password: config.DB_PWD,
  });