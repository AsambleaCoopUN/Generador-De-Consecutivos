const express = require('express');
const router = express.Router();
const pool = require('../src/db');

let cedula;
let idUser;

router.post('/', (req, res)=>{
  cedula = req.body.user;

  const user = `select u.usuario_id
    from consecutivo.usuario u
    where u.usuario_identificacion  = '${cedula}'`;

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error adquiriendo el cliente', err.stack)
    }
    console.log('Conexión exitosa a la base de datos')
  });
  
  pool.query(user,(error, resultUser)=>{    
    idUser = resultUser.rows[0].usuario_id;

    const history = `select u.usuario_nombre, p.prefijo, hc.consecutivo, hc.descripcion, 
    cast (hc.fecha_generacion as VARCHAR(16)) 
    AS fecha
    from consecutivo.usuario u,consecutivo.prefijo p,consecutivo.historia_consecutivo hc
    where hc.prefijo_id = p.prefijo_id  and hc.usuario_id = u.usuario_id
    and u.usuario_id = '${idUser}'
    order by fecha_generacion desc`;

    try {
      pool.query(history,(error, result)=>{
        try{
          res.render('users', {result:result.rows});
        }catch (error) {
          console.log(error);
          res.render('index');
        }
      });
    } catch (error) {
      console.log(error);
      res.render('index');
    };
  });
});

module.exports = router;