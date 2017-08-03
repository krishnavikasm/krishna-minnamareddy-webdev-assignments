var widgets = [
  { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
  { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    "url": "http://lorempixel.com/400/200/"},
  { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
  { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    "url": "https://www.youtube.com/embed/AM2Ivdi9c4E" },
  { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

var changeOrder = function(pageId, initial, final) {
  var newArray = [];
  var nonPageIdWidget = widgets.filter(function(widget) {
    return widget.pageId != pageId;
  });
  var pageIdWidgets = widgets.filter(function(widget){
    return widget.pageId == pageId;
  });
  var elem = pageIdWidgets[initial];
  pageIdWidgets.forEach(function(widget, index) {
    if (index != final && index != initial) {
      newArray = newArray.concat(widget);
    }
    if(index == final) {
      if(initial < final) {
        newArray = newArray.concat(widget);
        newArray = newArray.concat(elem);
      } else {
        newArray = newArray.concat(elem);
        newArray = newArray.concat(widget);
      }
    }
  });
  widgets = nonPageIdWidget.concat(newArray);
};

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
var multer = require('multer');
var folderName = __dirname+'/../../public/uploads';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderName);
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

var viewUrl = "/assignment/public/uploads/";
var uploadImage = function(req, res) {
  var widgetId = req.body.widgetId;
  var width = req.body.width;
  var name = req.body.name;
  var text = req.body.text;

  var myFile        = req.file;
  var userId = req.body.userId;
  var websiteId = req.body.websiteId;
  var pageId = req.body.pageId;
  if (myFile) {
    var originalname  = myFile.originalname;
    var filename      = myFile.filename;
    var path          = myFile.path;
    var destination   = myFile.destination;
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    var widget = findWidgetsById(widgetId);
    if (!widget) {
      widget = {};
      widget._id = widgetId;
      widget.width = width;
      widget.widgetType = "IMAGE";
      widget.pageId = pageId;
      widget.websiteId = websiteId;
      widget.userId = userId;
      widget.name = name;
      widget.text = text;
      widget.url = viewUrl+filename;
      createWidget(pageId, widget);
    } else {
      widget.url = viewUrl+filename;
      updateWidget(widgetId, widget);
    }
  }

  var callbackUrl = req.body.callback;
  if (callbackUrl) {
    res.redirect(callbackUrl);
  }
};

var fs = require("fs");

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

  app.post("/api/upload", upload.single('upload'), uploadImage);
  app.put("/page/:pageId/widget", function(req, res) {
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var final = req.query.final;
    if(initial < 0 || final < 0) {
      res.send(false);
      return ;
    }
    changeOrder(pageId, initial, final);
  });

};

module.exports = WidgetService;
