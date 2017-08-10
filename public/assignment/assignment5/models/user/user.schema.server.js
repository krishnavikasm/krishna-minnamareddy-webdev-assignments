var { mongoose } = require('../models.server.js');

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

module.exports = { User };
