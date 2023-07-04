const consecRouter = require('./consecRouter');
const mainRouter = require('./mainRouter');
const loginRouter = require('./loginRouter');
const usersRouter = require('./usersRouter')

function routerApp (app){
  app.use('/', mainRouter);
  app.use('/login', loginRouter);
  app.use('/list', consecRouter);
  app.use('/users', usersRouter);
}

module.exports = routerApp;