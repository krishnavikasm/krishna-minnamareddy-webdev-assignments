var { mongoose } = require('../models.server.js');
var { Website } = require('website.schema.server.js');


var WebsiteModel = mongoose.model('Website', Website);


var createWebsiteForUser = function(userId, website) {
  website["_user"] = userId;
  console.log('I am here');
  var newWebsite = new WebsiteModel(website);
  return newWebsite.save(function(err) {
    if(err) {
      return { status: false, error: err };
    } else {
      return { status: true };
    }
   });
};

var findAllWebsitesForUser = function(userId) {
  return WebsiteModel.find({"_id": userId})
    .exec(function (err, websites) {
      if(err) {
        return { status: false, error: error};
      } else {
        console.log(websites);
        return { status: true, websites };
      }
    });
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
    {"_id": websiteId},
    website,
    { new: true },
    function (newWebsite) {
      if (newWebsite) {
        return { status: true, newWebsite };
      } else {
        return { status: false };
      }
    }
  );
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
