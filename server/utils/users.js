// [{
//   id : '/#123131321',
//   name : 'Angel',
//   room : 'The office'
// }];

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)
//
class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((u) => u.id !== id)
    }

    return user;
  }

  getUser (id) {
    return this.users.find((user) => {
      return (user.id === id);
    });
  }

  getUserList (room) {
    var users = this.users.filter((user) => {
      return (user.room === room);
    }).map((user) => user.name);

    return users;
  }
}


module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
