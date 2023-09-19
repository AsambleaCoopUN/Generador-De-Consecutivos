const express = require('express');
const router = express.Router();
const pool = require('../src/db');

router.get('/', (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error adquiriendo el cliente', err.stack);
    }

    pool.query('select * from consecutivo.usuario order by usuario_id asc', (error, userResult) => {
      release(); // Liberar el cliente después de usarlo

      try {
        res.render('admin', { userResult: userResult.rows });
      } catch (error) {
        console.log(error);
        res.render('/index');
      }
    });
  });
});

module.exports = router;