var { mongoose } = require('../models.server.js');
var { Page } = require('./page.schema.server.js');
var { findWebsitesById, updateWebsite } = require('../website/website.model.server.js');


var PageModel = mongoose.model('Page', Page);

var createPage = function(websiteId, page){
  page._website = websiteId;
  return PageModel.create(page, function(err, newPage) {
    if(err) {
      return { status: false , error: err};
    } else {
      findWebsitesById(websiteId)
        .then(function (response) {
          if (response) {
            var pagesList = response.pages;
            pagesList.push(newPage._id);
            updateWebsite(websiteId, { pages: pagesList});
          }
        });
    }
  });
};

var findAllPagesForWebsites = function(websiteId) {
  return PageModel.find({_website: websiteId})
    .exec(function(error, pages) {
      if (error) {
        return { status: false, error };
      } else {
        return { status: true, pages };
      }
    });
};

var findPageById = function(pageId) {
  return PageModel.findOne({_id: pageId});
};

var updatePage = function(pageId, page) {
  return PageModel.findOneAndUpdate({ _id: pageId }, page);
};

var deletePage = function(pageId) {
  return PageModel.findOneAndRemove({ _id: pageId});
};


var changeOrder = function(widgets, pageId, initial, final) {
  var newArray = [];
  var elem = widgets[initial];
  widgets.forEach(function(widget, index) {
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
  return newArray;
};

var reorderWidget = function(pageId, start, end) {
  return PageModel.findOne({_id: pageId}).populate('widgets')
    .exec(function(error, page) {
      if (error) {
        return { status: false, error };
      } else {
        var widgets = page.widgets;
        var newWidgets = changeOrder(widgets, pageId, start, end);
        return PageModel.findOneAndUpdate({_id: pageId}, {widgets: newWidgets})
          .then(function(response) {});
      }
    });
};

module.exports = {
  createPage,
  findAllPagesForWebsites,
  findPageById,
  updatePage,
  deletePage,
  reorderWidget,
};
