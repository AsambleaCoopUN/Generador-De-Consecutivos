const app = require ('./app');
const { Server} = require ('socket.io');
const http = require ('http');
const sockets = require ('./sockets');
const { PORT } = require ('./config');

const server = http.createServer(app);
const httpServer = server.listen(PORT);

server.maxConnections = 20;
server.timeout = 60000;

const io = new Server(httpServer);
sockets(io);
