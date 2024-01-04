// // Importa el módulo oracledb.
// const oracledb = require('oracledb');
// const config = require('../src/config');

// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// // Define una función asincrónica llamada consultaLinix que acepta un parámetro cedulaAsociado
// async function consultaLinix(cedulaAsociado) {
//   let connection;
 
//   try {
//     // Establece una conexión a la base de datos Oracle utilizando los valores de configuracióm
//     connection = await oracledb.getConnection({
//       user          : config.conectLinix.user,
//       password      : config.conectLinix.password,
//       connectString : config.conectLinix.connectString
//     });
    
//     // Ejecuta una consulta SQL parametrizada que utiliza :cedula como marcador de posición
//     // y vincula el valor de cedulaAsociado al marcador de posición
//     const data = await connection.execute(
//       `SELECT AANUMNIT, NNASOCIA,C_ASOEMP AS CREDENCIAL FROM AP014MCLIENTE am WHERE AANUMNIT = :cedula`, [cedulaAsociado] // Bind de la variable cedulaAsociado
//     );
//     // Los resultados de la consulta se encuentran en data.rows
//     // console.log(data.rows);

//   } catch (error) {
//     console.error(error); // Imprime cualquier error que ocurra durante la ejecución
//   } finally {
//     if (connection) {
//       try {
//         // Cierra la conexión a la base de datos al finalizar
//         await connection.close();
//       } catch (error) {
//         console.error('Error al cerrar la conexión:', error);
//       }
//     }
//   }
// }
// // Llamada a la función con un valor de ejemplo para cedulaAsociado
// consultaLinix('79522572'); //dato quemado de cedula para test
