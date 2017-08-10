var { mongoose } = require('../models.server.js');
var { Page } = require('page.schema.server.js');


var PageModel = mongoose.model('Page', Page);

var createPage = function(websiteId, page){
  page._website = websiteId;
  var newPage = new PageModel(page);
  return newPage.save(function(err) {
    if(err) {
      return { status: false , error: err};
    } else {
      return { status: true };
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
  return PageModel.find({_id: pageId})
    .exec(function(error, page) {
      if (error) {
        return { status: false, error };
      } else {
        return { status: true, page };
      }
    });
};

var updatePage = function(pageId, page) {
  return PageModel.findOneAndUpdate(
    {_id: pageId},
    page,
    {new: true},
    function(newPage) {
      if (newPage) {
        return { status: true, newPage };
      } else {
        return { status: false };
      }
    }
  );
};

var deletePage = function(pageId) {
  return PageModel.findOneAndRemove(
    {_id: pageId},
    {},
    function(error) {
      if (error) {
        return { status: false, error };
      } else {
        return { status: true };
      }
    }
  );
};


var changeOrder = function(widgets, pageId, initial, final) {
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
  return nonPageIdWidget.concat(newArray);
};

var reorderWidget = function(pageId, start, end) {
  return PageModel.find({_id: pageId})
    .exec(function(error, page) {
      if (error) {
        return { status: false, error };
      } else {
        var widgets = page.widgets;
        var newWidgets = changeOrder(widgets, pageId, start, end);
        return PageModel.findOneAndUpdate(
          {_id: pageId},
          {widgets},
          { new: true },
          function (newPage){
            if (newPage) {
              return { status: true, page: newPage };
            } else {
              return { status: false };
            }
          }
        );
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
