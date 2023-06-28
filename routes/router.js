const consecRouter = require('./consecRouter');
const mainRouter = require('./mainRouter');

function routerApp (app){
  app.use('/list', consecRouter);
  app.use('/', mainRouter);
}

module.exports = routerApp;