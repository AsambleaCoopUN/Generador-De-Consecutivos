const ActiveDirectory = require('activedirectory');

const adConect = {
  url: 'ldap://192.168.0.65',
  baseDN:'DC=cooprofesoresun,DC=coop',
  username: 'glpi',
  password: 'Cooprofesores2023$',
};

/* Verifica las credenciales del usuario en el Directorio Activo */
const ad = new ActiveDirectory(adConfig);
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
