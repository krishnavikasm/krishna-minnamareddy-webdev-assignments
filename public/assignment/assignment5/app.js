var UserSchema = require('./models/user/user.schema.server.js');
var WebsiteSchema = require('./models/website/website.schema.server.js');
var PageSchema = require('./models/page/page.schema.server.js');
var WidgetService = require('./models/widget/widget.schema.server.js');


var UserService = require("./services/user.service.client.js");
var WebsiteService = require("./services/website.service.client.js");
var PageService = require("./services/page.service.client.js");
var WidgetService = require("./services/widget.service.client.js");

module.exports = function(app) {
  UserService(app);
  WebsiteService(app);
  PageService(app);
  WidgetService(app);
};
