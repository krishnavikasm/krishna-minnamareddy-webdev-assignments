var LoginController = function($routeParams, UserService, $location) {
  var errorMessages = {
    usernameUndefined: "Username is required",
    passwordUndefined: "Password is Undefined",
    invalidUser: "Either the username or the password is wrong",
  };
  this.login = function() {
    this.errorMessages = {
      username: undefined,
      password: undefined,
    };

    if (this.user == undefined) {
      this.errorMessages = {
        username: errorMessages.usernameUndefined,
        password: errorMessages.passwordUndefined
      };
      return;
    }
    if (this.user.username == undefined || this.user.username.trim() == "") {
      this.errorMessages = {
        username: errorMessages.usernameUndefined
      };
      return;
    }
    if (this.user.password == undefined || this.user.password.trim() == "") {
      this.errorMessages = {
        password: errorMessages.passwordUndefined
      };
      return;
    }
    if(!UserService.findUserByCredentials(this.user.username, this.user.password)) {
       this.errorMessages = {
        invalidUser: errorMessages.invalidUser
      };
    }

    $location.path("/profile");
  };
};


var ProfileController = function($scope, $routeParams, UserService, $location) {
  var userId = $routeParams['uid'];
  if (userId == undefined || userId == null || userId.trim() == "") {
    this.errorMessage = "No UserId defined";
    return;
  }
  this.user = UserService.findUserById(userId);
  if (this.user == undefined) {
    this.errorMesaage = "Invalid userId";
  }
  this.updateUser = function() {
    if(Object.keys($scope.profile.$error).length != 0) {
      return;
    }
    UserService.updateUser(this.user._id, this.user);
  };

  this.toProfile = function() {
    $location.path("/profile/"+userId);
  };
  
  this.toWebsites = function() {
    $location.path("/profile/"+userId+"/website");
  };
};

var WebsiteListController = function($scope, $routeParams, WebsiteService, $location) {
  var userId = $routeParams['uid'];
  this.toProfile = function() {
    $location.path("/profile/"+userId);
  };
  this.toPage = function(websiteId) {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page");
  };
  this.toWebsiteEdit = function(websiteId) {
    $location.path("/profile/"+userId+"/website/"+websiteId);
  };
  this.toWebsiteNew = function() {
    $location.path("/profile/"+userId+"/website/new");
  };
  this.websites = WebsiteService.findWebsitesByUser(userId);
};

var WebsiteEditController = function($scope, $routeParams, WebsiteService, $location) {
  var userId = $routeParams['uid'];
  var websiteId = $routeParams['wid'];
  this.toProfile = function() {
    $location.path("/profile/"+userId);
  };
  this.toPage = function(websiteId) {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page");
  };
  this.toWebsiteEdit = function(websiteId) {
    $location.path("/profile/"+userId+"/website/"+websiteId);
  };
  this.toWebsiteNew = function() {
    $location.path("/profile/"+userId+"/website/new");
  };
  this.toWebsitesList = function() {
    $location.path("/profile/"+userId+"/website");
  };
  this.saveAndMove = function() {
    WebsiteService.updateWebsite(websiteId, this.currentWebsite);
  }
  this.deleteWebsite = function() {
    WebsiteService.deleteWebsite(websiteId);
    this.toWebsitesList();
  };

  this.websites = WebsiteService.findWebsitesByUser(userId);
  this.currentWebsite = WebsiteService.findWebsitesById(websiteId);
};

var WebsiteNewController = function($scope, $routeParams, WebsiteService, $location) {
  var userId = $routeParams['uid'];
  this.toProfile = function() {
    $location.path("/profile/"+userId);
  };
  this.toPage = function(websiteId) {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page");
  };
  this.toWebsiteEdit = function(websiteId) {
    $location.path("/profile/"+userId+"/website/"+websiteId);
  };
  this.toWebsitesList = function() {
    $location.path("/profile/"+userId+"/website");
  };
  this.saveAndMove = function() {
    WebsiteService.updateWebsite(websiteId, this.currentWebsite);
  };

  this.newWebsite = function() {
    this.currentWebsite._id = Date().toString();
    WebsiteService.createWebsite(userId, this.currentWebsite);
    this.websites = WebsiteService.findWebsitesByUser(userId);
  };

  this.websites = WebsiteService.findWebsitesByUser(userId);
};

var PageController = function($scope, $routeParams, PageService, $location) {
  var userId = $routeParams.uid;
  var websiteId = $routeParams.wid;
  var pageId = $routeParams.pid;
  this.pages = PageService.findPageByWebsiteId(websiteId);
  this.currentPage = PageService.findPageById(pageId);

  this.toProfile = function() {
    $location.path("/profile/"+userId);
  };
  this.toWebsitesList = function() {
    $location.path("/profile/"+userId+"/website");
  };

  this.toPageList = function() {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page");
  };

  this.toPageNew = function() {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page/new");
  };

  this.toWidgetList = function(currentPageId) {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page/"+currentPageId+"/widget");
  };

  this.saveAndMove = function() {
    this.currentPage._id = Date().toString;
    PageService.createPage(websiteId, this.currentPage);
    this.toPageList();
  };

  this.deleteAndMove = function() {
    PageService.deletePage(this.currentPage._id);
    this.toPageList();
  };

  this.toPageEdit = function(pageId) {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page/"+pageId);
  };
};

var WidgetController = function($scope, $routeParams, WidgetService, $location) {
  var userId = $routeParams.uid;
  var websiteId = $routeParams.wid;
  var pageId = $routeParams.pid;
  var widgetId = $routeParams.wgid;
  this.widgets = WidgetService.findWidgetsByPageId(pageId);
  this.currentWidget = WidgetService.findWidgetsById(widgetId);
  this.toProfile = function() {
    $location.path("/profile/"+userId);
  };
  this.toPageList = function() {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page");
  };
  this.addWidget = function() {
  };
  this.widgetEdit = function(wgid) {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+wgid);
  };
}
