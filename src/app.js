import express from 'express';
import path from 'path';

const app = express();

/* establecer las carpetas estáticas */
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery/')));
app.use(express.static(path.join(__dirname, 'public')));

export default app;