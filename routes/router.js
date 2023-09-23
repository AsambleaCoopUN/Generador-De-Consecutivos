const consecRouter = require('./consecRouter');
const mainRouter = require('./mainRouter');
const loginRouter = require('./loginRouter');
const usersRouter = require('./usersRouter');
const server = require('./server');
const createRouter = require('./createRouter');
const adminRouter = require('./adminRouter');
const linix = require('./conectLinix');

function routerApp (app){
  app.use('/', loginRouter);
  app.use('/index', mainRouter);
  app.use('/list', consecRouter);
  app.use('/users', usersRouter);
  app.use('/create', createRouter);
  app.use('/server', server);
  app.use('/admin', adminRouter);
}

module.exports = routerApp;