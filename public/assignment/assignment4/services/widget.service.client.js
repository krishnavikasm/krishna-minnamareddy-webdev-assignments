var widgets = [
  { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
  { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    "url": "http://lorempixel.com/400/200/"},
  { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
  { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    "url": "https://youtu.be/AM2Ivdi9c4E" },
  { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

var createWidget = function(pageId, widget) {
  widget.pageId = pageId;
  return widgets.push(widget);
};

var findWidgetsByPageId = function(pageId) {
  return widgets.filter(function(widget) {
    return widget.pageId == pageId;
  });
};

var findWidgetsById = function(widgetId) {
  return widgets.find(function(widget) {
    return widget._id == widgetId;
  });
};

var updateWidget = function(widgetId, widget) {
  var index = widgets.findIndex(function(widget) {
    return widget._id == widgetId;
  });
  if (index < 0) {
    return widgets;
  }
  widgets[index] = widget;
  return widgets;
};

var deleteWidget = function(widgetId) {
  var index = widgets.findIndex(function(widget) {
    return widget._id == widgetId;
  });
  if (index < 0) {
    return widgets;
  }
  widgets.splice(index, 1);
  return widgets;
};

var WidgetService = function(app) {
  app.post("/api/page/:pageId/widget", function(req, res) {
    createWidget(req.params.pageId, req.body);
    res.send(true);
  });

  app.get("/api/page/:pageId/widget", function(req, res) {
    res.send(findWidgetsByPageId(req.params.pageId));
  });

  app.get("/api/widget/:widgetId", function(req, res) {
    res.send(findWidgetsById(req.params.widgetId));
  });

  app.put("/api/widget/:widgetId", function(req, res) {
    updateWidget(req.params.widgetId, req.body);
    res.send(true);
  });

  app.delete("/api/widget/:widgetId", function(req, res) {
    deleteWidget(req.params.widgetId);
    res.send(true);
  });

};

module.exports = WidgetService;
