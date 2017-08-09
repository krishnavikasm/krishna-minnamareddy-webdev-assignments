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

var UserService = function(app) {
  app.get('/api/user', function (req, res) {
    if (req.query.username && req.query.password) {
      res.send(findUserByCredentials(req.query.username, req.query.password));
    } else if(req.query.username) {
      res.send(findUserByUsername(req.query.username));
    }
  });

  app.get('/api/user/:userId', function (req, res) {
    res.send(findUserById(req.params.userId));
  });

  app.post('/api/user', function(req, res) {
    createUser(req.body);
    res.send(true);
  });

  app.put('/api/user/:userId', function (req, res) {
    updateUser(req.params.userId, req.body);
    res.send(true);
  });

  app.delete('/api/user/:userId', function (req, res) {
    deleteUser(req.params.userId);
    res.send(true);
  });

};

module.exports = UserService;
