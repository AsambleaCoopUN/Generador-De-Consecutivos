const ActiveDirectory = require('activedirectory');
const config = require('./config');
const router = require('../routes/consecRouter');

const adConect = {
  url: config.adConectConfig.url,
  baseDN: config.adConectConfig.baseDN,
  username: config.adConectConfig.username,
  password: config.adConectConfig.password
};

router.post('/', (req, res) => {
  // let username = (req.body.user) + ('@cooprofesoresun.coop');
  // let password = (req.body.pass);

  let name = ('acardenas@cooprofesoresun.coop');
  let password = ('Rey.18525');

  const ad = new ActiveDirectory(adConect);
  let cedula = ('1024380649');
/* Verifica las credenciales del usuario en el Directorio Activo */
  ad.authenticate(name, password, function(error, auth){
    if (error) {
      console.log('ERROR: ' + JSON.stringify(error));
      res.render('login');
      //return;
    }
    if (auth) {
      console.log("datos validados satisfactoriamente"); 
      let usuario = { cedula: cedula };
      res.render('users', usuario);
    } else {
      console.log("usuario o contraseña invalidos");
    }
  });

});
module.exports= router;
