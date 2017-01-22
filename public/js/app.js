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
  var formattedTime = moment(message.createAt).format('h:mm a');
  var $li = $('<li></li>');
  $li.text(`${message.from} ${formattedTime}: ${message.text}`);
  $('#messages').append($li);
});


socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createAt).format('h:mm a');
  var $li = $('<li></li>');
  var $a = $('<a target="_blank">My curreny location</a>');
  $li.text(`${message.from} ${formattedTime}: `);
  $a.attr('href', message.url);
  $li.append($a);
  $('#messages').append($li);
});

$('#messageForm').on('submit', function (e) {
  e.preventDefault();
  var $messageTextBox = $('[name="message"]');
  socket.emit('createMessage', {
    from : 'User',
    text : $messageTextBox.val()
  }, function () {
    $messageTextBox.val('');
  })
});

var $locationButton = $('#sendLocation');
$locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser');
  }

  $locationButton.attr('disabled', 'disabled').text('Sending location ...');

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    $locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      lat : position.coords.latitude,
      lng : position.coords.longitude
    });
  }, function () {
    $locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  })

});
