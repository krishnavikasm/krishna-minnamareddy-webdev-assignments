var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/assignments';
mongoose.connect(connectionString, {
  useMongoClient: true,
});

var db = mongoose.connection;

var User = mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  websites: [{ type: mongoose.Schema.ObjectId, ref: 'Website'}],
  dateCreated: { type: Date, default: Date.now }
});

var UserModel = mongoose.model('User', User);

var createUser = function(user) {
  var newUser = new UserModel(user);
  return newUser.save(function(err){
    if (err) {
      return {status: false, error: err};
    }
    return {status: true};
  });
};

var findUserById = function(userId) {
  return UserModel.findOne({ "_id": userId })
    .exec(function (err, user) {
      if (err) {
        return {status: false, error: err};
      } else {
        return { status: true, user };
      }
    });
};

var findUserByUsername = function(username) {
  return UserModel.findOne({ username })
    .exec(function (err, user) {
      if (err) {
        return { status: false, error: err};
      } else {
        return { status: true, user };
      }
    });
};

var findUserByCredentials = function(username, password) {
  return UserModel.findOne({ username, password })
    .exec(function (err, user) {
      if (err) {
        return { status: false, err };
      } else {
        return { status: true, user };
      }
    });
};

var updateUser = function(userId, user) {
  return UserModel.findOneAndUpdate(
    {"_id": userId},
    user,
    {new: true},
    function(newUser) {
      if (newUser) {
        return { status: true, user: newUser};
      } else {
        return { status: false };
      }
    });
};
var deleteUser = function(userId) {
  return UserModel.findOneAndRemove(
    {"_id": userId},
    {}, function(error) {
      if (error) {
        return { status: false, error: error };
      } else {
        return { status: true };
      }
    });
};


var Website = mongoose.Schema({
  _user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  name: String,
  description: String,
  dateCreated: { type: Date, default: Date.now }
});

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
var Page = mongoose.Schema({
  _website: { type: mongoose.Schema.ObjectId, ref: 'Website'},
  name: String,
  title: String,
  description: String,
  widgets: [{ type: mongoose.Schema.ObjectId, ref: 'Widget'}],
  dateCreated: { type: Date, default: Date.now()}
});

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

var Widget = mongoose.Schema({
  _page: { type: mongoose.Schema.ObjectId, ref: 'Page' },
  type: { type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
  name: String,
  text: String,
  placeholder: String,
  description: String,
  url: String,
  width: String,
  height: String,
  rows: Number,
  size: Number,
  class: String,
  icon: String,
  deletable: Boolean,
  formatted: Boolean,
  dateCreated: { type: Date, default: Date.now()}
});


var WidgetModel = mongoose.model('Widget', Widget);


var createWidget = function (pageId, widget) {
  widget._page = pageId;
  var newWidget = new WidgetModel(widget);
  return newWidget.save(function(error) {
    if (error) {
      return { status: false, error };
    } else {
      return { status: true };
    }
  });
};

var findAllWigetsForPage = function(pageId) {
  return WidgetModel.find({ _page: pageId})
    .exec(function (error, widgets) {
      if (error) {
        return { status: false, error };
      } else {
        return { status: true, widgets };
      }
    });
};

var findWidgetById = function(widgetId) {
  return WidgetModel.find({_id: widgetId})
    .exec(function (error, widget) {
      if (error) {
        return { status: false, error };
      } else {
        return { status: true, widget };
      }
    });
};

var updateWidget = function(widgetId, widget) {
  return WidgetModel.findOneAndUpdate(
    {_id: widgetId},
    widget,
    { new: true },
    function (newWidget) {
      if (newWidget) {
        return { status: true, widget: newWidget };
      } else {
        return { status: false };
      }
    }
  );
};

var deleteWidget = function(widgetId) {
  return WidgetModel.findOneAndRemove(
    {_id: widgetId},
    {}, function (error) {
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
