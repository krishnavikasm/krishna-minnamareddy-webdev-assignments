
var { createUser, findUserById, findUserByUsername,
      findUserByCredentials, updateUser, deleteUser } = require('./../models/user/user.model.server.js');



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
      findUserByCredentials(req.query.username, req.query.password)
        .then(function (response) {
          res.send(response);
        }).catch(function(error) {
          res.status(500).send({ error: 'Something failed!' });
        });
    } else if(req.query.username) {
      findUserByUsername(req.query.username)
        .then(function(response) {
        res.send(response);
      }).catch(function(error) {
        res.status(500).send({ error: 'Something failed!' });
      });
    }
  });

  app.get('/api/user/:userId', function (req, res) {
    findUserById(req.params.userId)
    .then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: 'Something failed!' });
    });
  });

  app.post('/api/user', function(req, res) {
    createUser(req.body).then(function(response) {
      res.send(true);
    }).catch(function(error) {
      res.status(500).send({ error: 'Something failed!' });
    });
  });

  app.put('/api/user/:userId', function (req, res) {
    updateUser(req.params.userId, req.body).then(function(response) {
      res.send(true);
    }).catch(function(error) {
      res.status(500).send({ error: 'Something failed!' });
    });
  });

  app.delete('/api/user/:userId', function (req, res) {
    deleteUser(req.params.userId).then(function(response) {
      res.send(true);
    }).catch(function(error) {
      res.status(500).send({ error: 'Something failed!' });
    });
  });

};

module.exports = UserService;
