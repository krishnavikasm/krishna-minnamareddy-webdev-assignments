var { mongoose } = require('../models.server.js');
var { Website } = require('./website.schema.server.js');
var { findUserById, updateUser } = require('../user/user.model.server.js');

var WebsiteModel = mongoose.model('Website', Website);

var createWebsiteForUser = function(userId, website) {
  website["_user"] = userId;
  return WebsiteModel.create(website, function(err, newWebsite) {
    if(err) {
      return { status: false, error: err };
    } else {
      var userWebsites = findUserById(userId);
      userWebsites.then(function(response) {
        if (response) {
          var websitesList = response.websites;
          websitesList.push(newWebsite._id);
          updateUser(userId, { websites: websitesList});
        }
      });
    }
  });
};

var findAllWebsitesForUser = function(userId) {
  return WebsiteModel.find({"_user": userId});
};

var findWebsitesById = function(websiteId) {
  return WebsiteModel.findOne({ "_id": websiteId })
    .exec(function (err, website) {
      if (err) {
        return { status: false, error: err };
      } else {
        return { status: true, website };
      }
    });
};

var updateWebsite = function(websiteId, website) {
  return WebsiteModel.findOneAndUpdate(
    {"_id": websiteId}, website);
};

var deleteWebsite = function(websiteId) {
  return WebsiteModel.findOneAndRemove(
    {"_id": websiteId},
    {}, function(error) {
      if (error) {
        return { status: false, error };
      } else {
        return { status: true };
      }
    }
  );
};

module.exports = {
  createWebsiteForUser,
  findAllWebsitesForUser,
  findWebsitesById,
  updateWebsite,
  deleteWebsite
};
