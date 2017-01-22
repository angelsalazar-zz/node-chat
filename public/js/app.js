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


socket.on('newLocationMessage', function (message) {
  var $li = $('<li></li>');
  var $a = $('<a target="_blank">My curreny location</a>');
  $li.text(`${message.from}: `);
  $a.attr('href', message.url);
  $li.append($a);
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

var $locationButton = $('#sendLocation');
$locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      lat : position.coords.latitude,
      lng : position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
  })

});
