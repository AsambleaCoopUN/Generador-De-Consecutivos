const express = require('express');
const router = express.Router();
const pool = require('../src/db');
let message;

router.post('/', (req, res) => {
  const idUser = req.body.idUser;
  const idPrefijo = req.body.prefijo;
  const concepto = req.body.concepto;

  const insert = `INSERT INTO consecutivo.historia_consecutivo (usuario_id, prefijo_id, descripcion)
    VALUES ('${idUser}', '${idPrefijo}', '${concepto}')`;

  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error adquiriendo el cliente', err.stack);
      return;
    }

    console.log('Conexión exitosa a la base de datos');

    try {
      pool.query(insert, (error, result) => {
        if (result) {
          const resultado = `SELECT MAX(hc.consecutivo) AS consecutivo 
          FROM consecutivo.historia_consecutivo hc
          WHERE hc.usuario_id = '${idUser}' 
            AND hc.prefijo_id = '${idPrefijo}'
            AND EXTRACT(YEAR FROM hc.fecha_generacion) = EXTRACT(YEAR FROM CURRENT_DATE);`;

          try {
            pool.query(resultado, (error, result) => {
              if (result && result.rows.length > 0) {
                message = 'Consecutivo generado: ' + result.rows[0].consecutivo;
                res.send(`
                  <head>
                    <link rel="stylesheet" href="../stylesheets/styles.css">
                  </head>
                  <div class="confirmacion-container">
                    <h1 class="confirmacion-title">${message}</h1>
                    <button class="confirmacion-button" onclick="redirectToLogin(true)">Aceptar</button>
                  </div>
                  <script>
                    function redirectToLogin(confirm) {
                      if (confirm) {
                        window.location.href = '/users';
                      } else {
                        window.location.href = '/users';
                      }
                    }
                  </script>
                `);
              } else {
                console.log('No se encontró el consecutivo');
              }
            });
          } catch (error) {
            console.log('Error de ejecución:', error);
          }
        }
      });
    } catch (error) {
      console.log('Error en la inserción:', error);
      res.render('login');
    }

    release(); // Liberar el cliente después de usarlo
  });
});

module.exports = router;