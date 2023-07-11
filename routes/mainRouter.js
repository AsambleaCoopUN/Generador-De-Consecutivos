const express = require('express');
const router = express.Router();
const pool = require('../src/db');

let name;
let message;

router.post('/', (req,res)=> {
  const idUser = req.body.idUser;

  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error adquiriendo el cliente', err.stack);
      return;
    }      
  }); 
  name = `select u.usuario_nombre from consecutivo.usuario u where usuario_id = '${idUser}';`;

  pool.query(name, (error2, result) => {
    if (result.rows[0].usuario_nombre === 'sin usuario'){
      console.log('nombre de usuario no encontrado');
      message = 'Comuniquese con el administrador para habilitar su usuario en la plataforma';
        res.send(`<script>
                    alert('"${message}"');
                    window.location.href = '/logout';
                  </script>`);

      /* res.render('logout');     */
    }else{
      res.render('index',{idUser:idUser});
    }
  }); 
});

module.exports = router;