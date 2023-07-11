const express = require('express');
const router = express.Router();
const pool = require('../src/db');

router.get('/', (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error adquiriendo el cliente', err.stack);
    }

    console.log('Conexión exitosa a la base de datos');

    pool.query('SELECT * FROM consecutivo.historia_consecutivo', (error, result) => {
      release(); // Liberar el cliente después de usarlo

      try {
        res.render('list', { result: result.rows });
      } catch (error) {
        console.log(error);
        res.render('/index');
      }
    });
  });
});

module.exports = router;