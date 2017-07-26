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
