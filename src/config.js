const { config } = require ('dotenv');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

config();
// se asignan los datos de las variables de entorno a un arreglo para enviar a la conecion 
const conectionData2 = {
  user: process.env.userC,
  password: process.env.passwordC,
  host: process.env.hostC,
  port: process.env.portC,
  database: process.env.databaseC
};

const adConectConfig = {
  url: process.env.urlC,
  baseDN: process.env.baseDNC,
  username: process.env.usernameC,
  password: process.env.passwordC,
  dominio: process.env.dominioC
};

const PORT = process.env.PORT || 8100;

module.exports = {
  conectionData2,
  adConectConfig,
  PORT
};

