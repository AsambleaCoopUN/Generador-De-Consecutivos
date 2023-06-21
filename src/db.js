const { Pool } = require('pg');
const config  = require('./config');
const conectionData2 =require('./config');

const conectionData = config.conectionData2; // se recibe el arreglo y se configra para realizar el pool de conexiones 

/* conexión servidor local, se asigna cada valor de la conexion acada variable*/ 
const pool = new Pool({
  user: conectionData.user,
  password: conectionData.password,
  host: conectionData.host,
  port: conectionData.port,
  database: conectionData.database
});

//console.log(conectionData);
pool.connect((err, client, release) => {   
  if (err) {
    return console.error('Error adquiriendo el cliente', err.stack)
  }
  console.log('Conexión exitosa a la base de datos')
});

const test = async () => {
  try {
    const res = await pool.query('select * from c9onsecutivo.usuario');
    console.log(res.rows);
    pool.end();
  } catch (error) {
    console.log(error);
  };
};

test();

module.exports = pool;