const ActiveDirectory = require('activedirectory');
const config = require('./config');

const adConectConfig = config.adConectConfig;

const username = "nombreDeUsuario";
const password = "contraseñaDelUsuario";

const adConect = {
  url: adConectConfig.user,
  baseDN: adConectConfig.baseDN,
  username: adConectConfig.username,
  password: adConectConfig.password,
};
console.log(adConect);

/* Verifica las credenciales del usuario en el Directorio Activo */
const ad = new ActiveDirectory(adConect);
ad.authenticate(username, password, (error, auth) => {
  if (error) {
    console.log(error);
  }
  if (!auth) {
    console.log("usuario o contraseña invalidos");
  } else {
    console.log("datos validados satisfactoriamente");
  }
});

