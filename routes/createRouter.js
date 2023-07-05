const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const idPrefijo = req.body.prefijo;
  const concepto = req.body.concepto;

  console.log(idPrefijo);
  console.log(concepto);

  res.json({ idPrefijo, concepto });
});

module.exports = router;