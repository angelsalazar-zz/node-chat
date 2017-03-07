require('./config/config');

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const port = process.env.PORT;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
var app = express();

var server = http.createServer(app);

// starting sockets
var io = socketIO(server);

// serve static files
app.use(express.static(path.join(__dirname,'../public')));
app.use('/libs',express.static(path.join(__dirname,'../node_modules')));


// listen for new connection
io.on('connection', (socket) => {
  console.log('new User connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }

    socket.join(params.room);
    //socket.leave(str)

    // target specific user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to node chat app'));
    // notify other users
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  })
  // Listen for createMessage event
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    // io.emit send broadcast
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('this is from the server');
    // send the broadcast message, but not the creator
    // socket.broadcast.emit('newMessage', {
    //   from : message.from,
    //   text : message.text,
    //   createAt : new Date().getTime()
    // })
  })

  socket.on('createLocationMessage', (coords, callback) => {
    console.log('createLocationMessage', coords);
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));

  });
  // Listen for createEmail event
  socket.on('createEmail',  (newEmail) => {
    console.log('createEmail', newEmail)
  });
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
