const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {
  var users;

  beforeEach(() => {
    user = new Users();
    user.users = [{
      id : '1',
      name : 'Mike',
      room : 'Node Course'
    }, {
      id : '2',
      name : 'Roger',
      room : 'React Course'
    }, {
      id : '3',
      name : 'Jhon',
      room : 'Node Course'
    }]
  })

  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id : 12323,
      name : 'Angel',
      room : 'test'
    }
    var addedUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);

  });

  it('should remove a user', () => {

  })

  it('should not remove a user', () => {

  })

  it('should find user', () => {

  })

  it('should not find user', () => {

  })
  
  it('should return names for node cource', () => {
    var userList = user.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Jhon']);
  });

  it('should return names for react cource', () => {
    var userList = user.getUserList('React Course');
    expect(userList).toEqual(['Roger']);
  });
})
