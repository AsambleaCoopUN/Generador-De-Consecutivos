import express from 'express';
import path from 'path';
const routerApp = require('../routes/router');
const app = express();

/* establecer las carpetas estáticas */
app.use(express.static(path.join(__dirname, '../node_modules/bootstrap/')));
app.use(express.static(path.join(__dirname, '../node_modules/jquery/')));
app.use(express.static(path.join(__dirname, 'public')));

/* indicación para la captura de datos con método post */
const { json } = require("express");
app.use(express.urlencoded({extended:false}));
app.use(express.json());

/* EJS como motor de plantillas*/
app.set('view engine','ejs');


/* llamado del enrrutador */
routerApp(app);

export default app;