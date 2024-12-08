const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    setInterval(()=>{
        socket.emit("current-date", new Date().toLocaleTimeString());
    }, 1000);
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});