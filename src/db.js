const { Pool } = require('pg');
const config  = require('./config');

const conectionData = config.conectionData2; // se recibe el arreglo y se configra para realizar el pool de conexiones 

/* conexión servidor local, se asigna cada valor de la conexion acada variable*/ 
const pool = new Pool({
  user: conectionData.user,
  password: conectionData.password,
  host: conectionData.host,
  port: conectionData.port,
  database: conectionData.database,
  max: 10,
});

module.exports = pool;