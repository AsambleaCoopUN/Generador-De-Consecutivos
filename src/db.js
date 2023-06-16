const { Pool } = require('pg');
const config  = require('./config');
const conectionData2 =require('./config');

const conectionData = config.conectionData2;

const pool = new Pool({// coloque aca la variable a conectar
  user: conectionData.user,
  password: conectionData.password,
  host: conectionData.host,
  port: conectionData.port,
  database: conectionData.database
});


/* conexión servidor local*/
  pool.connect((err, client, release) => {   
    if (err) {
      return console.error('Error adquiriendo el cliente', err.stack)
    }
    console.log('Conexión exitosa a la base de datos')
  });
 

module.exports = pool;
