const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config(); 

const app = express();
const server = http.createServer(app);


const PORT = process.env.PORT || 3001;

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.16.110:3000"],
    methods: ["GET", "POST"], 
    credentials: true
  },
});


io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

 
  socket.on('message', (msg) => {
    console.log(`Message received from ${socket.id}: ${msg}`);
    io.emit('message', msg); 
  });

 
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

 
  socket.on('error', (err) => {
    console.error(`Socket error from ${socket.id}:`, err);
  });
});


server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
