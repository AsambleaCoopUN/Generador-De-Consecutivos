import app from './app';
import { Server as websocketserver } from 'socket.io';
import http from 'http';

const server = http.createServer(app);
const httpServer = server.listen(3000);
const io = new websocketserver(httpServer);


console.log('server listen');

