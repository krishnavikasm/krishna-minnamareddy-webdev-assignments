var mongoose = require('mongoose');
var connectionString = 'mongodb://vikas:vikas@ds151242.mlab.com:51242/heroku_g0sv4lv3';
mongoose.connect(connectionString, {
  useMongoClient: true,
});

var db = mongoose.connection;

module.exports = {
  mongoose
};

