var users = [
  {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
  {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
  {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
  {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];

var createUser = function(user) {
  return users.push(user);
};

var findUserById = function(userId) {
  return users.find(function(user) {
    return user._id == userId;
  });
};

var findUserByUsername = function(username) {
  return users.filter(function(user) {
    return user.username == username;
  });
};

var findUserByCredentials = function(username, password) {
  return users.find(function(user) {
    return user.username == username && user.password == password;
  });
};

var updateUser = function(userId, user) {
  var index = users.findIndex(function(currentUser) {
    return currentUser._id == userId;
  });
  if (index < 0) {
    return users;
  }
  users[index] = user;
  return users;
};

var deleteUser = function(userId) {
  var index = users.findIndex(function(currentUser) {
    return currentUser._id == userId;
  });
  if (index < 0) {
    return users;
  }
  users.splice(index, 1);
  return users;
};

var api = {
  createUser,
  findUserById,
  findUserByUsername,
  findUserByCredentials,
  updateUser,
  deleteUser,
};

var UserService = function() {
  return api;
};
