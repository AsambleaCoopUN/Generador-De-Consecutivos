const consecRouter = require('./consecRouter');

function routerApp (app){
  app.use('/list', consecRouter);
}

module.exports = routerApp;