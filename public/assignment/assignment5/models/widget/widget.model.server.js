var { mongoose } = require('../models.server.js');
var { Widget } = require('./widget.schema.server.js');
var { findPageById, updatePage } = require('../page/page.model.server.js');
var { reorderWidget, findPageById } = require('./../page/page.model.server.js');

var WidgetModel = mongoose.model('Widget', Widget);


var createWidget = function (pageId, widget) {
  widget._page = pageId;
  return WidgetModel.create(widget, function(error, newWidget) {
    if (error) {
      return { status: false, error };
    } else {
      findPageById(pageId).then(
        function (response) {
          console.log(response);
          if (response) {
            var widgetsList = response.widgets;
            widgetsList.push(newWidget._id);
            updatePage(pageId, { widgets: widgetsList })
              .then(function(response) {
              });
          }
        }
      );
    }
  });
};


var findAllWigetsForPage = function(pageId) {
  return findPageById(pageId).populate('widgets');
};

var findWidgetById = function(widgetId) {
  return WidgetModel.findOne({_id: widgetId});
};

var updateWidget = function(widgetId, widget) {
  return WidgetModel.findOneAndUpdate(
    {_id: widgetId},
    widget);
};

var deleteWidget = function(widgetId) {
  return WidgetModel.findOneAndRemove({_id: widgetId});
};


module.exports = {
  createWidget,
  findAllWigetsForPage,
  findWidgetById,
  updateWidget,
  deleteWidget,
  reorderWidget,
};
