var {
  createPage,
  findAllPagesForWebsites,
  findPageById,
  updatePage,
  deletePage,
  reorderWidget,
} = require('./../models/page/page.model.server.js');


var PageService = function(app) {
  app.post("/api/website/:websiteId/page", function(req, res) {
    createPage(req.params.websiteId, req.body).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.get("/api/website/:websiteId/page", function(req, res) {
    findAllPagesForWebsites(req.params.websiteId).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.get("/api/page/:pageId", function(req, res) {
    findPageById(req.params.pageId).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.put("/api/page/:pageId", function(req, res) {
    updatePage(req.params.pageId, req.body).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.delete("/api/page/:pageId", function(req, res) {
    deletePage(req.params.pageId).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });
};

module.exports = PageService;
