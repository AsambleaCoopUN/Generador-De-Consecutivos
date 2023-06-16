import { config } from 'dotenv';
require('dotenv').config();

config();

export const conectionData2 = {
  user: process.env.userC,
  password: process.env.passwordC,
  host: process.env.hostC,
  port: process.env.portC,
  database: process.env.databaseC
}

//module.export = conectionData2;
  //POSTGRES_URI: process.env.POSTGRES_URI,

export const PORT = process.env.PORT || 3000;

