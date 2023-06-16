const { Pool } = require('pg');
import { config } from 'dotenv';

config()

export const POSGRES_URI = process.env.POSGRES_URI;
export const PORT = process.env.PORT || 3000;

/* conexión servidor local*/
const pool = new Pool({
   // coloque aca la variable a conecatar
  });

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error adquiriendo el cliente', err.stack)
    }
    console.log('Conexión exitosa a la base de datos')
  });

module.exports = pool;