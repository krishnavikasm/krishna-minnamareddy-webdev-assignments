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

var PageService = function() {
  return {
    createPage,
    findPageByWebsiteId,
    findPageById,
    updatePageById,
    deletePage
  }};
