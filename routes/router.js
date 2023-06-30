const consecRouter = require('./consecRouter');
const mainRouter = require('./mainRouter');
const loginRouter = require('./loginRouter');

function routerApp (app){
  app.use('/', mainRouter);
  app.use('/login', loginRouter);
  app.use('/list', consecRouter);
}

module.exports = routerApp;