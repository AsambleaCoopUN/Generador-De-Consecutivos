const ActiveDirectory = require('activedirectory');
const config = require('../src/config');
const express = require('express');
const router = express.Router();
let message;
const adConect = {
  url: config.adConectConfig.url,
  baseDN: config.adConectConfig.baseDN,
  username: config.adConectConfig.username,
  password: config.adConectConfig.password,
  dominio: config.adConectConfig.dominio
};

router.post('/', async (req, res) => {
  const userldap = req.body.userldap;
  const userpassldap = req.body.pass;
  const cookie = req.cookies.usercookie;

  if (cookie === userldap) {
    res.redirect('/users');
  } else {
    const usercomplete = userldap + adConect.dominio;
    const ad = new ActiveDirectory(adConect);

    try {
      const auth = await authenticateAD(ad, usercomplete, userpassldap);
      if (auth) {
        res.cookie('usercookie', userldap, {
          maxAge: 1000 * 60 * 20,
          /* httpOnly: true,
          secure:true, */
        });
        res.redirect('/users');
      } else {
        message = 'Autenticación fallida';
        res.send(`<script>
                  alert('"${message}"');
                  window.location.href = '/';
              </script>`);
      }
    } catch (error) {
      console.log('ERROR: ' + JSON.stringify(error));
      message = 'Usuario o contraseña incorrecta';
      res.send(`<script>
                  alert('"${message}"');
                  window.location.href = '/';
              </script>`);
    }
  }
});

function authenticateAD(ad, usercomplete, userpassldap) {
  return new Promise((resolve, reject) => {
    ad.authenticate(usercomplete, userpassldap, (error, auth) => {
      if (error) {
        reject(error);
      } else {
        resolve(auth);
      }
    });
  });
}

module.exports = router;