// Start socket
var socket = io();

function scrollToBottom () {
  var $messages = $('#messages');
  var $newMessage = $messages.children('li:last-child');

  var newMessageHeight = $newMessage.innerHeight();
  var lastMessageHeight = $newMessage.prev().innerHeight();

  var clientHeight = $messages.prop('clientHeight');
  var scrollTop = $messages.prop('scrollTop');
  var scrollHeight = $messages.prop('scrollHeight');

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    //console.log('should scroll');
    $messages.scrollTop(scrollHeight);
  }
}
// listen for connect event
socket.on('connect', function () {
  console.log('connected to server');
  var params = $.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      return window.location.href = '/';
    }

    console.log('No error')
  });
});
// listen for disconnect event
socket.on('disconnect', function () {
  console.log('disconnectde from server');
});

// listen for newMessage event
socket.on('newMessage', function (message) {

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text : message.text,
    from : message.from,
    createdAt : formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});


socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from : message.from,
    url : message.url,
    createdAt : formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
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
