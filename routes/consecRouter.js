const express = require('express');
const router = express.Router();
const pool = require('../src/db');

router.get('/', (req,res)=> {
  //console.log(conectionData);
  try {
    pool.connect((err, client, release) => {   
      if (err) {
        return console.error('Error adquiriendo el cliente', err.stack)
      }
      console.log('Conexión exitosa a la base de datos')
    });

    const result = pool.query('select * from consecutivo.usuario');
    console.log(result);
    res.render('list', {result:result.row}); 
    /* pool.end(); */
  } catch (error) {
    console.log(error);
  };
  /* console.log(result); */
  /* res.render('list'); */
});

module.exports = router;