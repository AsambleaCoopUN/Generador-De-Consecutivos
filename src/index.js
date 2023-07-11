const app = require ('./app');
const { Server} = require ('socket.io');
const http = require ('http');
const sockets = require ('./sockets');
const { PORT } = require ('./config');

const server = http.createServer(app);
const httpServer = server.listen(PORT);

const io = new Server(httpServer);
sockets(io);
