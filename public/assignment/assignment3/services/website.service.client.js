var websites = [
  { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
  { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
  { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
  { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
  { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
  { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
  { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];


var createWebsite = function(userId, website) {
  website.developerId = userId;
  return websites.push(website);
};

var findWebsitesByUser = function(userId) {
  return websites.filter(function(website) {
    return website.developerId == userId;
  });
};

var findWebsitesById = function(websiteId) {
  return websites.find(function(website) {
    return website._id == websiteId;
  });
};

var updateWebsite = function(websiteId, website) {
  var index = websites.findIndex(function(currentWebsite) {
    return currentWebsite._id == websiteId;
  });
  if (index < 0) {
    return websites;
  }
  websites[index] = website;
  return websites;
};

var deleteWebsite = function(websiteId) {
  var index = websites.findIndex(function(currentWebsite) {
    return currentWebsite._id == websiteId;
  });
  if (index < 0) {
    return websites;
  }
  websites.splice(index, 1);
  return websites;
};

var WebsiteService = function() {
  return {
    createWebsite,
    findWebsitesByUser,
    findWebsitesById,
    updateWebsite,
    deleteWebsite
  };
}
