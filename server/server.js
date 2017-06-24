require('./config/config');

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const port = process.env.PORT;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();

var server = http.createServer(app);

// starting sockets
var io = socketIO(server);

// users
var users = new Users

// serve static files
app.use(express.static(path.join(__dirname,'../public')));
app.use('/libs',express.static(path.join(__dirname,'../node_modules')));


// listen for new connection
io.on('connection', (socket) => {
  console.log('new User connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // target specific user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to node chat app'));
    // notify other users
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  })
  // Listen for createMessage event
  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      // io.emit send broadcast
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));

    }
    callback('this is from the server');
    // send the broadcast message, but not the creator
    // socket.broadcast.emit('newMessage', {
    //   from : message.from,
    //   text : message.text,
    //   createAt : new Date().getTime()
    // })
  })

  socket.on('createLocationMessage', (coords, callback) => {
    var user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng));
    }

  });
  // Listen for createEmail event
  socket.on('createEmail',  (newEmail) => {
    console.log('createEmail', newEmail)
  });
  // listen for drop connection
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
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
