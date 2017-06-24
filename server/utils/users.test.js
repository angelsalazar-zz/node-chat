const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
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
    var userIdToRemove = users.users[0].id;
    var user = users.removeUser(userIdToRemove);
    expect(user.id).toBe(userIdToRemove);
    expect(users.users.length).toBe(2);
  })

  it('should not remove a user', () => {
    var user = users.removeUser(85363);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  })

  it('should find user', () => {
    var user = users.getUser(users.users[1].id);
    expect(user.id).toBe(users.users[1].id);
  })

  it('should not find user', () => {
    var user = users.getUser(85363);
    expect(user).toEqual(undefined);
  })

  it('should return names for node cource', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Jhon']);
  });

  it('should return names for react cource', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Roger']);
  });
})
