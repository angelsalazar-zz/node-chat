// Start socket
var socket = io();

// listen for connect event
socket.on('connect', function () {
  console.log('connected to server');
  // allows to emit a custom event "createMessage"
  // socket.emit('createMessage', {
  //   from : 'jesus@jesus.com',
  //   text : 'hey hey'
  // });
});

// listen for disconnect event
socket.on('disconnect', function () {
  console.log('disconnectde from server');
});

// listen for newMessage event
socket.on('newMessage', function (message) {
  console.log('new message', message);
  var $li = $('<li></li>');
  $li.text(`${message.from}: ${message.text}`);
  $('#messages').append($li);
});

$('#messageForm').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from : 'User',
    text : $('[name="message"]').val()
  }, function () {

  })
  $('[name="message"]').val('');
});
