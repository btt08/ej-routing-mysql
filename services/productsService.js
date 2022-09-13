const client = require('mysql2/promise');
const config = require('../modules/config');
const conData = {
  host: config.DB_HOST,
  database: config.DB_NAME,
  user: config.DB_USER,
  password: config.DB_PWD,
};

const getAllProducts = async () => {
  const connection = await client.createConnection(conData);
  const query = 'SELECT p.id, p.name AS brand, price, color, m.name AS Manufacturer, p.cif AS cif, address AS Address FROM products p JOIN manufacturers m ON m.cif = p.cif;';
  return await connection.execute(query);
};

const filterProducts = async (brand, color, price, manufacturer) => {
  const connection = await client.createConnection(conData);
  const query = `SELECT p.name AS brand, price, color, m.name AS Manufacturer, p.cif AS cif, address AS Address FROM products p JOIN manufacturers m ON m.cif = p.cif WHERE p.name LIKE '%${brand ? brand.toUpperCase() : ''}%' AND p.color LIKE '%${color ?? ''}%' ${price ? `AND p.price < ${price} ` : ''} AND p.cif LIKE '%${manufacturer ?? ''}%'`;
  return await connection.execute(query);
};

const deleteCar = async (id) => {
  const connection = await client.createConnection(conData);
  const query = `DELETE FROM products WHERE id = ${id};`;
  await connection.execute(query);
};

module.exports = {
  getAllProducts,
  filterProducts,
  deleteCar
};