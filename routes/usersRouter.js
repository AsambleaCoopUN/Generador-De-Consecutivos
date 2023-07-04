const express = require('express');
const router = express.Router();
const pool = require('../src/db');

let cedula;
let idUser;
let message;

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
  
  try{
    pool.query(user,(error1, resultUser)=>{
      if(!error1){
        idUser = resultUser.rows[0].usuario_id;  
      }else{
        console.log(error1);
        message = 'Usuario no encontrado';
        res.send(`<script>
                  if(confirm('${message}')){
                    window.location.href='/login';
                  }else{
                    window.location.href='/login';
                  }
                  </script>`);
      };
    });

      const history = `select u.usuario_nombre, p.prefijo, hc.consecutivo, hc.descripcion, 
      cast (hc.fecha_generacion as VARCHAR(16)) 
      AS fecha
      from consecutivo.usuario u,consecutivo.prefijo p,consecutivo.historia_consecutivo hc
      where hc.prefijo_id = p.prefijo_id  and hc.usuario_id = u.usuario_id
      and u.usuario_id = '${idUser}'
      order by fecha_generacion desc`;
      
    pool.query(history,(error2, result)=>{
      if(!error2){
        res.render('users', {result:result.rows});
      }else{
        message = 'Usuario no encontrado';
        console.log(error2);
        res.send(`<script>
                  if(confirm('${message}')){
                    window.location.href='/login';
                  }else{
                    window.location.href='/login';
                  }
                  </script>`);
      }
    });
  }catch{
    console.log(error1,error2);
    res.render('login');
  }
});

module.exports = router;