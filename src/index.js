import app from './app';
import { Server as websocketserver } from 'socket.io';
import http from 'http';
import sockets from './sockets';
import { PORT } from './config'; // se recibe el puerto para l servidor 

const server = http.createServer(app);
const httpServer = server.listen(PORT);

server.maxConnections = 20;
server.timeout = 60000;

const io = new websocketserver(httpServer);
sockets(io);
