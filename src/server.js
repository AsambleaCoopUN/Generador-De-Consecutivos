const ActiveDirectory = require('activedirectory');
const config = require('./config');
 
const adConect = {
  url: config.adConectConfig.url,
  baseDN: config.adConectConfig.baseDN,
  username: config.adConectConfig.username,
  password: config.adConectConfig.password,
  dominio: config.adConectConfig.dominio
};

function validacionldap(userldap, userpassldap, cookie, callback) {
  if (cookie) {
    console.log('aca entro');
    return(true);
  } else {
    let usercomplete = (userldap) + (adConect.dominio);
    const ad = new ActiveDirectory(adConect);
    return new Promise((resolve, reject) => {
      ad.authenticate(usercomplete, userpassldap, function(error, auth) {
        if (error) {
          console.log('ERROR: ' + JSON.stringify(error));
          resolve(false);
        }
        if (auth) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  };
}
  

module.exports = {
  validacionldap
};

