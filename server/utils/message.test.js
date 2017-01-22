const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should create a message',  () => {
    var from = 'angel@angel.com';
    var text = 'Hello';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      text
    });

  })
});

describe('generateLocationMessage', () => {
  it('should generate a correct location message',  () => {
    var from = 'angel@angel.com';
    var lat = 12.12, lng = 14.14;
    var url = `https://www.google.com/maps?q=${lat},${lng}`;
    var message = generateLocationMessage(from, lat, lng);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      url
    });

  })
});
