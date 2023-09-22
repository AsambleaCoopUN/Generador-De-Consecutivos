const express = require('express');
const router = express.Router();
const pool = require('../src/db');

router.get('/', (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error adquiriendo el cliente', err.stack);
    }

    pool.query(`select hc.usuario_id, u.usuario_nombre, p.prefijo, p.descripcion_prefijo, hc.consecutivo, hc.descripcion, 
    cast (hc.fecha_generacion as VARCHAR(16)) 
    as fecha
    from consecutivo.historia_consecutivo hc, consecutivo.prefijo p, consecutivo.usuario u 
    where hc.prefijo_id = p.prefijo_id
    and hc.usuario_id = u.usuario_id`, (error, result) => {
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