var {
  createWidget,
  findAllWigetsForPage,
  findWidgetById,
  updateWidget,
  deleteWidget,
  reorderWidget
} = require('./../models/widget/widget.model.server.js');

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
    findWidgetById(widgetId).then(function(response) {
      var widget = response;
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
        createWidget(pageId, widget).then(function(response) {
          var callbackUrl = req.body.callback;
          if (callbackUrl) {
            res.redirect(callbackUrl);
          }
        });
      } else {
        widget.url = viewUrl+filename;
        updateWidget(widgetId, widget).then(function(response) {
          var callbackUrl = req.body.callback;
          if (callbackUrl) {
            res.redirect(callbackUrl);
          }
        });
      }
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  };
};

var fs = require("fs");

var WidgetService = function(app) {
  app.post("/api/page/:pageId/widget", function(req, res) {
    createWidget(req.params.pageId, req.body).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.get("/api/page/:pageId/widget", function(req, res) {
    findAllWigetsForPage(req.params.pageId).then(function(response) {
      res.send(response.widgets);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.get("/api/widget/:widgetId", function(req, res) {
    findWidgetById(req.params.widgetId).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.put("/api/widget/:widgetId", function(req, res) {
    updateWidget(req.params.widgetId, req.body).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.delete("/api/widget/:widgetId", function(req, res) {
    deleteWidget(req.params.widgetId).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
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
    reorderWidget(pageId, initial, final);
  });

};

module.exports = WidgetService;
