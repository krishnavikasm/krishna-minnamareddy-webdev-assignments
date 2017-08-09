var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/assignments';
mongoose.connect(connectionString, {
  useMongoClient: true,
});

var db = mongoose.connection;

var User = mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  websites: [{ type: mongoose.Schema.ObjectId, ref: 'Website'}],
  dateCreated: { type: Date, default: Date.now }
});

var UserModel = mongoose.model('User', User);

var createUser = function(user) {
  var newUser = new UserModel(user);
  newUser.save(function(err){
    if (err) {
      return {status: false, error: err};
    }
    return {status: true};
  });
};

var findUserById = function(userId) {
  UserModel.findOne({ "_id": userId })
    .exec(function (err, user) {
      if (err) {
        return {status: false, error: err};
      } else {
        return { status: true, user };
      }
    });
};

var findUserByUsername = function(username) {
  UserModel.findOne({ username })
    .exec(function (err, user) {
      if (err) {
        return { status: false, error: err};
      } else {
        return { status: true, user };
      }
    });
};

var findUserByCredentials = function(username, password) {
  UserModel.findOne({ username, password })
    .exec(function (err, user) {
      if (err) {
        return { status: false, err };
      } else {
        return { status: true, user };
      }
    });
};

var updateUser = function(userId, user) {
  UserModel.findOneAndUpdate(
    {"_id": userId},
    user,
    {new: true},
    function(newUser) {
      if (newUser) {
        return { status: true, user: newUser};
      } else {
        return { status: false };
      }
    });
};
var deleteUser = function(userId) {
  UserModel.findOneAndRemove(
    {"_id": userId},
    {}, function(error) {
      if (error) {
        return { status: false, error: error };
      } else {
        return { status: true };
      }
    });
};


var Website = mongoose.Schema({
  _user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  name: String,
  description: String,
  dateCreated: { type: Date, default: Date.now }
});

var WebsiteModel = mongoose.model('Website', Website);


var createWebsiteForUser = function(userId, website) {
  website["_user"] = userId;
  console.log('I am here');
  var newWebsite = new WebsiteModel(website);
  console.log(newWebsite);
  newWebsite.save(function(err) {
    if(err) {
      console.log(err);
      return { status: false, error: err };
    } else {
      return { status: true };
    }
   });
};

var findAllWebsitesForUser = function(userId) {
  WebsiteModel.find({"_id": userId})
    .exec(function (err, websites) {
      if(err) {
        return { status: false, error: error};
      } else {
        console.log(websites);
        return { status: true, websites };
      }
    });
};

var findWebsitesById = function(websiteId) {
  WebsiteModel.findOne({ "_id": websiteId })
    .exec(function (err, website) {
      if (err) {
        return { status: false, error: err };
      } else {
        return { status: true, website };
      }
    });
};

var updateWebsite = function(websiteId, website) {
  WebsiteModel.findOneAndUpdate(
    {"_id": websiteId},
    website,
    { new: true },
    function (newWebsite) {
      if (newWebsite) {
        return { status: true, newWebsite };
      } else {
        return { status: false };
      }
    }
  );
};
var deleteWebsite = function(websiteId) {
  WebsiteModel.findOneAndRemove(
    {"_id": websiteId},
    {}, function(error) {
      if (error) {
        return { status: false, error };
      } else {
        return { status: true };
      }
    }
  );
};

var Page = mongoose.Schema({
  _website: { type: mongoose.Schema.ObjectId, ref: 'Website'},
  name: String,
  title: String,
  description: String,
  widgets: [{ type: mongoose.Schema.ObjectId, ref: 'Widget'}],
  dateCreated: { type: Date, default: Date.now()}
});

var Widget = mongoose.Schema({
  _page: { type: mongoose.Schema.ObjectId, ref: 'Page' },
  type: { type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
  name: String,
  text: String,
  placeholder: String,
  description: String,
  url: String,
  width: String,
  height: String,
  rows: Number,
  size: Number,
  class: String,
  icon: String,
  deletable: Boolean,
  formatted: Boolean,
  dateCreated: { type: Date, default: Date.now()}
});
