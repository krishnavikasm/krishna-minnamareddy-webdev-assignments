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
    this.currentPage._id = Date().toString();
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
