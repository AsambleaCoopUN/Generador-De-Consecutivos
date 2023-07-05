const express = require('express');
const router = express.Router();

router.post('/', (req,res)=> {
  const idUser = req.body.idUser;
  res.render('index',{idUser:idUser});
});

module.exports = router;