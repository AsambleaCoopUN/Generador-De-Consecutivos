/*Esto es solo una prueba*/

let lastMonth = 0;
let lastYear = 0;
let counter = 0;

function generateConsecutive() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  
  if (month !== lastMonth || year !== lastYear) {
    counter = 1;
  } else {
    counter++;
  }
  
  lastMonth = month;
  lastYear = year;
  
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedCounter = counter < 10 ? `00${counter}` : counter < 100 ? `0${counter}` : counter;
  
  return `${formattedCounter}-${formattedMonth}-${year}`;
}
