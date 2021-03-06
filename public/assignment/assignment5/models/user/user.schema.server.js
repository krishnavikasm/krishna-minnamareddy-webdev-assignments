var { mongoose } = require('../models.server.js');

var User = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites: [{ type: mongoose.Schema.ObjectId, ref: 'Website'}],
  dateCreated: { type: Date, default: Date.now }
});

module.exports = { User };
