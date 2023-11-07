// Importa los módulos necesarios
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Define una función llamada generarYDescargarCSV que acepta datos como argumento
function generarYDescargarCSV(datos) {
  // Extrae las filas de los datos
  const filas = datos.rows;

  try {
    // Mapea los datos para seleccionar las columnas necesarias
    const data = filas.map(item => {
      return {
        fecha: item.fecha,
        consecutivo: item.consecutivo,
        prefijo: item.prefijo,
        dependencia: item.descripcion_prefijo,
        descripcion: item.descripcion
      };
    });

    // Configura el nombre del archivo CSV y la cabecera
    const csvWriter = createCsvWriter({
      path: 'datos.csvpero', // Define el nombre del archivo CSV
      header: [
        { id: 'fecha', title: 'Fecha' },
        { id: 'consecutivo', title: 'Consecutivo' },
        { id: 'prefijo', title: 'Prefijo' },
        { id: 'dependencia', title: 'Dependencia' },
        { id: 'descripcion', title: 'Descripción' }
        // Define las columnas y títulos correspondientes
      ],
    });

    // Escribe los datos en el archivo CSV
    csvWriter.writeRecords(data)
      .then(() => {
        console.log('Archivo CSV generado con éxito'); // Indica que la generación fue exitosa
      })
      .catch((error) => {
        console.error('Error al generar el archivo CSV:', error); // Maneja errores de generación
      });
  } catch (error) {
    console.error(error); // Maneja errores generales
  }
}

// Exporta la función generarYDescargarCSV para que pueda ser utilizada por otros módulos
module.exports = { generarYDescargarCSV };