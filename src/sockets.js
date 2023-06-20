export default (io) => {

  io.on('connection', () => {
    console.log('nuevo cliente');
  });
  
};