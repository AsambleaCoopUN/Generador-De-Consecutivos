const ActiveDirectory = require('activedirectory');
const config = require('./config');
const express = require('express');
const router = express.Router();

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
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          secure:true,
        });
        res.redirect('/users');
      } else {
        console.log('Autenticación fallida');
        res.redirect('/login');
      }
    } catch (error) {
      console.log('ERROR: ' + JSON.stringify(error));
      res.redirect('/login');
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