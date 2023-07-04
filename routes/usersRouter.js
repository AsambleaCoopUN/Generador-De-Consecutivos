const express = require('express');
const router = express.Router();
const pool = require('../src/db');

let userldap;
let idUser;
let message;
let history;

router.post('/', (req, res)=>{
  userldap = req.body.userldap;

  const user = `select u.usuario_nombre, u.usuario_id 
  from consecutivo.usuario u
  where u.usuario_ldap  = '${userldap}'`;

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error adquiriendo el cliente', err.stack)
    }
    console.log('Conexión exitosa a la base de datos')
  });

  pool.query(user,(error1, resultUser)=>{   
    if (!error1){
      idUser = resultUser.rows[0].usuario_id;
      history = `select p.prefijo, hc.consecutivo, hc.descripcion, 
      cast (hc.fecha_generacion as VARCHAR(16))
      as fecha 
      from consecutivo.usuario u,consecutivo.prefijo p,consecutivo.historia_consecutivo hc
      where hc.prefijo_id = p.prefijo_id  and hc.usuario_id = u.usuario_id
      and u.usuario_id = '${idUser}'
      order by fecha_generacion desc`;

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
    
    pool.query(history,(error2, result)=>{
      if (!error2){
        if (result!=""){
          res.render('users', {resultUser:resultUser.rows ,result:result.rows});
        }else{
          message = 'Datos no encontrado';
          res.send(`<script>
                  if(confirm('${message}')){
                    window.location.href='/login';
                  }else{
                    window.location.href='/login';
                  }
                  </script>`);
        }
      }else {
        console.log(error2);
        message = 'Datos no encontrado';
        res.send(`<script>
                  if(confirm('${message}')){
                    window.location.href='/login';
                  }else{
                    window.location.href='/login';
                  }
                  </script>`);
      }
    });  
  });
});

module.exports = router;