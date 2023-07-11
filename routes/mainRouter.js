const express = require('express');
const router = express.Router();
const pool = require('../src/db');

let name;
let message;

router.post('/', (req, res) => {
  const idUser = req.body.idUser;

  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error adquiriendo el cliente', err.stack);
      return;
    }

    name = `SELECT u.usuario_nombre FROM consecutivo.usuario u WHERE usuario_id = '${idUser}';`;

    pool.query(name, (error2, result) => {
      release(); // Liberar el cliente después de usarlo

      if (result.rows[0].usuario_nombre === 'sin usuario') {
        console.log('nombre de usuario no encontrado');
        message = 'Comuníquese con el administrador para habilitar su usuario en la plataforma';
        res.send(`<script>
                    alert("${message}");
                    window.location.href = '/logout';
                  </script>`);
      } else {
        res.render('index', { idUser: idUser });
      }
    });
  });
});

module.exports = router;