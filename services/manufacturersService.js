const client = require('mysql2/promise');
const config = require('../modules/config');
const conData = {
  host: config.DB_HOST,
  database: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PWD,
};

const getAllManufacturers = async () => {
  const connection = await client.createConnection(conData);
  const query = "SELECT * FROM manufacturers";
  return await connection.execute(query);
}

module.exports = getAllManufacturers;