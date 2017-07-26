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
