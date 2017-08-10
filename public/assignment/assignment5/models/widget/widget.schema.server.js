var { mongoose } = require('../models.server.js');

var Widget = mongoose.Schema({
  _page: { type: mongoose.Schema.ObjectId, ref: 'Page' },
  type: { type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']},
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

module.exports = {
  Widget,
};
