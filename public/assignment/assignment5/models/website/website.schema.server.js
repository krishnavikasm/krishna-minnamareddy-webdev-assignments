var { mongoose } = require('../models.server.js');

var Website = mongoose.Schema({
  _user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  name: String,
  description: String,
  pages: [{type: mongoose.Schema.ObjectId, ref: 'Page'}],
  dateCreated: { type: Date, default: Date.now }
});

module.exports = { Website };
