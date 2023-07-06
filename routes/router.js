const consecRouter = require('./consecRouter');
const mainRouter = require('./mainRouter');
const loginRouter = require('./loginRouter');
const usersRouter = require('./usersRouter');
const server = require('../src/server');
const createRouter = require('./createRouter');

function routerApp (app){
  app.use('/', loginRouter);
  app.use('/index', mainRouter);
  app.use('/list', consecRouter);
  app.use('/users', usersRouter);
  app.use('/create', createRouter);
  app.use('/server', server);
}

module.exports = routerApp;