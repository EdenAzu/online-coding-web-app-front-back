/* The core of my web application
 * const app = express()- This line creates an instance of the Express application,
 * which represents your web server and is used to configure middleware and routes.
 */ 

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

//In a production environment we will use a secure password manager such as aws credentials storage
mongoose.connect('mongodb+srv://azoulayeden1:eden2024@cluster0.sdmh1ao.mongodb.net/');
app.use(express.static(path.join(__dirname, '../client')));
app.use('/api', routes);

const connectedClients = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  const socketId = socket.handshake.query.socketId;
  if (socketId && connectedClients.has(socketId)) {
    // If the IF loop is correct, it's a reconnection
    const existingSocket = connectedClients.get(socketId);
    socket.join(existingSocket.rooms);
    connectedClients.set(socketId, socket);
  } else {
    // It's a new connection
    connectedClients.set(socket.id, socket);
  }

  socket.on('joinRoom', (room) => {
    const clients = io.sockets.adapter.rooms.get(room)?.size || 0;

    socket.join(room);
    console.log(`User joined room ${room}`);

    io.to(room).emit('roomInfo', { room, clients });
  });

  socket.on('codeChange', (data) => {
    socket.broadcast.to(data.room).emit('codeChange', data.code);
  });

  // socket.on('codeMatch', () => {
  //   io.emit('displaySmiley'); 
  // });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    connectedClients.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));