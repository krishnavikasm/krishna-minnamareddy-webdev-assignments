var { mongoose } = require('../models.server.js');
var Page = mongoose.Schema({
  _website: { type: mongoose.Schema.ObjectId, ref: 'Website'},
  name: String,
  title: String,
  description: String,
  widgets: [{ type: mongoose.Schema.ObjectId, ref: 'Widget'}],
  dateCreated: { type: Date, default: Date.now()}
});

module.exports = {
  Page
};
