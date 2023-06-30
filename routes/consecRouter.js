const express = require('express');
const router = express.Router();
const pool = require('../src/db');

router.get('/', (req,res)=> {
  //console.log(conectionData);
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error adquiriendo el cliente', err.stack)
    }
    console.log('Conexión exitosa a la base de datos')
  });
  
  pool.query('select * from consecutivo.historia_consecutivo',(error, result)=>{
    try {
      res.render('list', {result:result.rows});
    } catch (error) {
      console.log(error);
      res.render('index');
    };
  });
});

module.exports = router;