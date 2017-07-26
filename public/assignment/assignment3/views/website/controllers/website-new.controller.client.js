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
