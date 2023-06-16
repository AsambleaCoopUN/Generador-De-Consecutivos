import app from './app';
import { Server as websocketserver } from 'socket.io';
import http from 'http';
import sockets from './sockets';
import { PORT } from './config';

import  {pool} from './db'

const server = http.createServer(app);
const httpServer = server.listen(PORT);
console.log("server corriendo en puerto" , PORT);

const io = new websocketserver(httpServer);
//sockets(io);

console.log('server listen');
