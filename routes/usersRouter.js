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
      if (!error1) {
        idUser = resultUser.rows[0].usuario_id;
        history = `SELECT p.prefijo, hc.consecutivo, hc.descripcion, CAST(hc.fecha_generacion AS VARCHAR(16)) AS fecha FROM consecutivo.usuario u, consecutivo.prefijo p, consecutivo.historia_consecutivo hc WHERE hc.prefijo_id = p.prefijo_id AND hc.usuario_id = u.usuario_id AND u.usuario_id = '${idUser}' ORDER BY fecha_generacion DESC`;
      } else {
        console.log(error1);
        message = 'Usuario no encontrado';
        res.send(`<head>
                    <link rel="stylesheet" href="../stylesheets/styles.css" >
                    </head>
                    <div class="confirmacion-container">
                      <h1 class="confirmacion-title">${message}</h1>
                      <button class="confirmacion-button" onclick="redirectToLogin(true)">Aceptar</button>
                      <button class="confirmacion-button confirmacion-button-cancel" onclick="redirectToLogin(false)">Cancelar</button>
                    </div>
                    <script>
                    function redirectToLogin(confirm) {
                      if (confirm) {
                        window.location.href = '/login';
                      } else {
                        window.location.href = '/login';
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
                          <button class="confirmacion-button" onclick="redirectToLogin(true)">Aceptar</button>
                          <button class="confirmacion-button confirmacion-button-cancel" onclick="redirectToLogin(false)">Cancelar</button>
                        </div>
                        <script>
                        function redirectToLogin(confirm) {
                          if (confirm) {
                            window.location.href = '/login';
                          } else {
                            window.location.href = '/login';
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
                        <button class="confirmacion-button confirmacion-button-cancel" onclick="redirectToLogin(false)">Cancelar</button>
                      </div>
                      <script>
                      function redirectToLogin(confirm) {
                        if (confirm) {
                          window.location.href = '/login';
                        } else {
                          window.location.href = '/login';
                        }
                      }
                      </script>`
          );
        }
      });
    }); 
  }
});

module.exports = router;