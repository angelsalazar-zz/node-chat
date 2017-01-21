const expect = require('expect');

const {generateMessage} = require('./message');

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
