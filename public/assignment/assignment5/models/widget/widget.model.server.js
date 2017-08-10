var { mongoose } = require('../models.server.js');
var { Widget } = require('widget.schema.server.js');


var WidgetModel = mongoose.model('Widget', Widget);


var createWidget = function (pageId, widget) {
  widget._page = pageId;
  var newWidget = new WidgetModel(widget);
  return newWidget.save(function(error) {
    if (error) {
      return { status: false, error };
    } else {
      return { status: true };
    }
  });
};

var findAllWigetsForPage = function(pageId) {
  return WidgetModel.find({ _page: pageId})
    .exec(function (error, widgets) {
      if (error) {
        return { status: false, error };
      } else {
        return { status: true, widgets };
      }
    });
};

var findWidgetById = function(widgetId) {
  return WidgetModel.find({_id: widgetId})
    .exec(function (error, widget) {
      if (error) {
        return { status: false, error };
      } else {
        return { status: true, widget };
      }
    });
};

var updateWidget = function(widgetId, widget) {
  return WidgetModel.findOneAndUpdate(
    {_id: widgetId},
    widget,
    { new: true },
    function (newWidget) {
      if (newWidget) {
        return { status: true, widget: newWidget };
      } else {
        return { status: false };
      }
    }
  );
};

var deleteWidget = function(widgetId) {
  return WidgetModel.findOneAndRemove(
    {_id: widgetId},
    {}, function (error) {
      if (error) {
        return { status: false, error };
      } else {
        return { status: true };
      }
    }
  );
};


module.exports = {
  createWidget,
  findAllWigetsForPage,
  findWidgetById,
  updateWidget,
  deleteWidget
};
