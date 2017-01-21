require('./config/config');

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const port = process.env.PORT;

var app = express();

var server = http.createServer(app);

// starting sockets
var io = socketIO(server);

// serve static files
app.use(express.static(path.join(__dirname,'../public')));

// listen for new connection
io.on('connection', (socket) => {
  console.log('new User connected');
  // listen for drop connection
  socket.on('disconnect', () => {
    console.log('disconnectde from server');
  })
})

server.listen(port, (err) => {
  if (err) {
    console.log("whoops something went wrong", err);
  } else {
    console.log(`Server up on port ${port}`)
  }
})
