var pages = [
  { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
  { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
  { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

var createPage = function(websiteId, page) {
  page.websiteId = websiteId;
  return pages.push(page);
};


var findPageByWebsiteId = function(websiteId){
  return pages.filter(function(page) {
    return page.websiteId == websiteId;
  });
};

var findPageById = function(pageId) {
  return pages.find(function(page) {
    return page._id == pageId;
  });
};

var updatePageById = function(pageId, page) {
  var index = pages.findIndex(function(page) {
    return page._id == pageId;
  });
  if (index < 0) {
    return pages;
  }
  pages[index] = page;
  return pages;
};

var deletePage = function(pageId) {
  var index = pages.findIndex(function(page) {
    return page._id == pageId;
  });
  if (index < 0) {
    return pages;
  }
  pages.splice(index, 1);
  return pages;
};

var PageService = function(app) {
  app.post("/api/website/:websiteId/page", function(req, res) {
    createPage(req.params.websiteId, req.body);
    res.send(true);
  });
  app.get("/api/website/:websiteId/page", function(req, res) {
    res.send(findPageByWebsiteId(req.params.websiteId));
  });

  app.get("/api/page/:pageId", function(req, res) {
    res.send(findPageById(req.params.pageId));
  });
  app.put("/api/page/:pageId", function(req, res) {
    updatePageById(req.params.pageId, req.body);
    res.send(true);
  });
  app.delete("/api/page/:pageId", function(req, res) {
    deletePage(req.params.pageId);
    res.send(true);
  });
};

module.exports = PageService;
