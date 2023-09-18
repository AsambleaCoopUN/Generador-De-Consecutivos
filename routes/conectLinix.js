const oracledb = require('oracledb');
const config = require('../src/config');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function consultaLinix(cedulaAsociado) {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user          : config.conectLinix.user,
      password      : config.conectLinix.password,
      connectString : config.conectLinix.connectString
    });
    //console.log(connection);

    const data = await connection.execute(
      `SELECT AANUMNIT, NNASOCIA,C_ASOEMP AS CREDENCIAL FROM AP014MCLIENTE am WHERE AANUMNIT ='79522572'`,
    );
    console.log(data.rows);

  } catch (error) {
    console.log(err);    
  }

}

consultaLinix();
