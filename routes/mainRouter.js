const express = require('express');
const router = express.Router();
const pool = require('../src/db');

let name;
let prefijo;
let message;

router.post('/', (req, res) => {
  const idUser = req.body.idUser;

  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error adquiriendo el cliente', err.stack);
      return;
    }

    name = `SELECT u.usuario_nombre FROM consecutivo.usuario u WHERE usuario_id = '${idUser}';`;
    prefijo = `select prefijo_id, p.descripcion_prefijo
    as nombre from consecutivo.prefijo p order by prefijo_id`;

    pool.query(name, (error, result) => {
      release(); // Liberar el cliente después de usarlo

      if (result.rows[0].usuario_nombre === 'sin usuario') {
        console.log('nombre de usuario no encontrado');
        message = 'Comuníquese con el administrador para habilitar su usuario en la plataforma';
        res.send(`<script>
                    alert("${message}");
                    window.location.href = '/logout';
                  </script>`);
      } else {
        pool.query(prefijo, (error2, rPrefijo) => {
          try{
            res.render('index', { idUser: idUser, rPrefijo:rPrefijo.rows });
          }catch (error2){
            message = 'Error de comunicaicón con la base de datos';
            res.send(`<script>
                    alert("${message}");
                    window.location.href = '/logout';
                  </script>`);
          }
        });        
      }
    });
  });
});

module.exports = router;