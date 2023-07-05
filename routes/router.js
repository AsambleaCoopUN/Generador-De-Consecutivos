const consecRouter = require('./consecRouter');
const mainRouter = require('./mainRouter');
const loginRouter = require('./loginRouter');
const usersRouter = require('./usersRouter');
const createRouter = require('./createRouter');

function routerApp (app){
  app.use('/', mainRouter);
  app.use('/login', loginRouter);
  app.use('/list', consecRouter);
  app.use('/users', usersRouter);
  app.use('/create', createRouter);
}

module.exports = routerApp;