const express = require('express');
const router = express.Router();
const pool = require('../src/db');

let userldap;
let idUser;
let message;
let history;

router.get('/', (req, res) => {

  if (!req.cookies.usercookie) {
    res.render('login');
  } else {
   userldap = req.cookies.usercookie;
    const user = `SELECT u.usuario_nombre, u.usuario_id FROM consecutivo.usuario u WHERE u.usuario_ldap = '${userldap}'`;    
    pool.connect((err, client, release) => {
      if (err) {
        console.error('Error adquiriendo el cliente', err.stack);
        return;
      }      
    });
    
    pool.query(user, (error1, resultUser) => {
      if (resultUser.rows && resultUser.rows.length > 0 && resultUser.rows[0].usuario_id !== "") {
        if (!error1) {
          idUser = resultUser.rows[0].usuario_id;
          /* console.log(idUser); */
          history = `select p.prefijo, p.descripcion_prefijo , hc.consecutivo, hc.descripcion, 
          cast (hc.fecha_generacion as VARCHAR(16)) 
          as fecha 
          from consecutivo.usuario u,consecutivo.prefijo p,consecutivo.historia_consecutivo hc
          where hc.prefijo_id = p.prefijo_id  and hc.usuario_id = u.usuario_id
          and u.usuario_id = '${idUser}'
          order by fecha_generacion desc`;
        } else {
          console.log(idUser);
          console.log(error1);
          message = 'Usuario no encontrado';
          res.send(`<head>
                      <link rel="stylesheet" href="../stylesheets/styles.css" >
                      </head>
                      <div class="confirmacion-container">
                        <h1 class="confirmacion-title">${message}</h1>
                        <button class="confirmacion-button" onclick="redirectToLogin(true)">Aceptar</button>
                      </div>
                      <script>
                      function redirectToLogin(confirm) {
                        if (confirm) {
                          window.location.href = '/';
                        } else {
                          window.location.href = '/';
                        }
                      }
                      </script>`
          );
        }

          pool.query(history, (error2, result) => {
            if (!error2) {
            if (result != "") {
                res.render('users', { resultUser: resultUser.rows, result: result.rows });
            } else {
              message = 'Datos no encontrado';
              res.send(`<head>
                          <link rel="stylesheet" href="../stylesheets/styles.css" >
                          </head>
                          <div class="confirmacion-container">
                            <h1 class="confirmacion-title">${message}</h1>
                            <button class="confirmacion-button"       
                            onclick="redirectToLogin(true)">Aceptar</button>
                          </div>
                          <script>
                          function redirectToLogin(confirm) {
                            if (confirm) {
                              window.location.href = '/';
                            } else {
                              window.location.href = '/';
                            }
                          }
                          </script>`
              );
            }
          } else {
            console.log(error2);
            message = 'Datos no encontrado';
            res.send(`<head>
                        <link rel="stylesheet" href="../stylesheets/styles.css" >
                        </head>
                        <div class="confirmacion-container">
                          <h1 class="confirmacion-title">${message}</h1>
                          <button class="confirmacion-button" onclick="redirectToLogin(true)">Aceptar</button>
                        </div>
                        <script>
                        function redirectToLogin(confirm) {
                          if (confirm) {
                            window.location.href = '/';
                          } else {
                            window.location.href = '/';
                          }
                        }
                        </script>`
            );
          }
        });
    }else{
      const create = `insert into consecutivo.usuario (usuario_ldap)
      values ('${userldap}')`;
      pool.query(create, (error, result) => {
        try{
        console.log("usuario creado");
        message = 'Comuniquese con el administrador para habilitar su usuario en la plataforma';
        res.send(`<script>
                  alert('"${message}"');
                  window.location.href = '/';
              </script>`);
        }catch(error){
          console.log(error);
          res.render(login);
        }
      });
    }
    });
  }
});

module.exports = router;