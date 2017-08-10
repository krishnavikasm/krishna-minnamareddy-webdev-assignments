var {
  createWebsiteForUser,
  findAllWebsitesForUser,
  findWebsitesById,
  updateWebsite,
  deleteWebsite
} = require('./../models/website/website.model.server.js');

var WebsiteService = function(app) {
  app.post("/api/user/:userId/website", function(req, res) {
    createWebsiteForUser(req.params.userId, req.body).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.get("/api/user/:userId/website", function(req, res) {
    findAllWebsitesForUser(req.params.userId).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.get("/api/website/:websiteId", function(req, res) {
    findWebsitesById(req.params.websiteId).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.put("/api/website/:websiteId", function(req, res) {
    updateWebsite(req.params.websiteId, req.body).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

  app.delete("/api/website/:websiteId", function(req, res) {
    deleteWebsite(req.params.websiteId).then(function(response) {
      res.send(response);
    }).catch(function(error) {
      res.status(500).send({ error: error });
    });
  });

};

module.exports = WebsiteService;
