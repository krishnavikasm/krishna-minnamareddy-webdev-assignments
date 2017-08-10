var { mongoose } = require('../models.server.js');
var { User } = require('./user.schema.server.js');


var UserModel = mongoose.model('User', User);

var createUser = function(user) {
  var newUser = new UserModel(user);
  return newUser.save(function(err){
    if (err) {
      return {status: false, error: err};
    }
    return {status: true};
  });
};

var findUserById = function(userId) {
   return UserModel.findOne({ "_id": userId })
    .exec(function (err, user) {
      if (err) {
        return {status: false, error: err};
      } else {
        return { status: true, user };
      }
    });
};

var findUserByUsername = function(username) {
  return UserModel.findOne({ username })
    .exec(function (err, user) {
      if (err) {
        return { status: false, error: err};
      } else {
        return { status: true, user };
      }
    });
};

var findUserByCredentials = function(username, password) {
  return UserModel.findOne({ username, password })
    .exec(function (err, user) {
      if (err) {
        return { status: false, err };
      } else {
        return { status: true, user };
      }
    });
};

var updateUser = function(userId, user) {
  console.log(user);
  return UserModel.findOneAndUpdate(
    {"_id": userId}, user);
};

var deleteUser = function(userId) {
  return UserModel.findOneAndRemove(
    {"_id": userId});
};


module.exports = {
  UserModel,
  createUser,
  findUserById,
  findUserByUsername,
  findUserByCredentials,
  updateUser,
  deleteUser
};
