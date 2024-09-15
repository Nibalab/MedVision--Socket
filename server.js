const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config(); // For environment variables

const app = express();
const server = http.createServer(app);

// Use PORT from environment variables or default to 3001
const PORT = process.env.PORT || 3001;

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.16.110:3000"],
    methods: ["GET", "POST"], // Allowed methods
    credentials: true
  },
});

// Log when a user connects
io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // When a message is received, broadcast it
  socket.on('message', (msg) => {
    console.log(`Message received from ${socket.id}: ${msg}`);
    io.emit('message', msg); // Broadcast to all clients
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  // Handle potential errors
  socket.on('error', (err) => {
    console.error(`Socket error from ${socket.id}:`, err);
  });
});

// Start the server and listen on the defined PORT
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
