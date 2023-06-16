const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  // coloque aca la variable a conectar
  //connectionString: config.POSTGRES_URI 
  user: 'root',
  password: 'root',
  host: '192.168.0.154',
  port: 5430,
  database: 'consecutivos'
});


/* conexión servidor local*/
  pool.connect((err, client, release) => {   
    if (err) {
      return console.error('Error adquiriendo el cliente', err.stack)
    }
    console.log('Conexión exitosa a la base de datos')
  });
 

module.exports = pool;
