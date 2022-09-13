const products = require('./modules/products');
const manufacturers = require('./modules/manufacturers');

const client = require('./modules/mysql');

const createBBDD = async () => {

  const queryCreateProductsTable = 'CREATE TABLE concesionario.manufacturers( cif varchar(10), `name` varchar(20), address varchar(50), PRIMARY KEY (cif) );'

  const queryCreateManufacturersTable = 'CREATE TABLE concesionario.products( id int NOT NULL, `name` varchar(20), cif varchar(10), price int, color varchar(20), PRIMARY KEY (id), FOREIGN KEY (cif) REFERENCES concesionario.manufacturers (cif));'

  try {
    //  client.query(`${queryCreateProductsTable}`);
    //  client.query(`${queryCreateManufacturersTable}`);

    let values = '';

    manufacturers.forEach(async manufacturer => {
      values += `( '${manufacturer.cif}', '${manufacturer.name}', '${manufacturer.address}' ),`;
    })

    values = values.substring(0, values.length - 1);

    let queryCreateManufacturers = `INSERT INTO concesionario.manufacturers(cif, \`name\`, address) VALUES ${values};`

    console.log('QUERY PARA INSERTAR FABRICANTESº\n', queryCreateManufacturers)

    let idProduct = 0;
    values = '';
    products.forEach(async product => {
      idProduct++;
      values += `(${idProduct},'${product.name}','${product.manufacturer}',${product.price},'${product.color}'),`;
    })

    values = values.substring(0, values.length - 1);

    let queryCreateProducts = `INSERT INTO concesionario.products(id, \`name\`, cif, price, color) VALUES ${values};`

    console.log('QUERY PARA INSERTAR PRODUCTOS\n', queryCreateProducts);

    client.query(`${queryCreateManufacturers}`);
    client.query(`${queryCreateProducts}`);
    console.log('TABLAS CREADAS CON ÉXITO');
  } catch (e) {
    console.log('ERROR', e)
  }
  client.end();
}

createBBDD();