const express = require('express');
const router = express.Router();

router.get('/', (req,res)=> {
  res.render('index');
});

router.get('/list', (req,res)=> {
  test();
  res.render('list');
});

module.exports = router;