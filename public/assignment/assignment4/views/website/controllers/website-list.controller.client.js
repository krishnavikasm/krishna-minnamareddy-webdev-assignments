var WebsiteListController = function($scope, $routeParams, $http, $location) {
  var userId = $routeParams['uid'];
  var this1 = this;
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

  $http.get("/api/user/"+userId+"/website")
    .then(function(response) {
      if(response.status == 200) {
        this1.websites = response.data;
      }
    })
    .catch(function(error) {
      this1.errorMessage = "Something went wrong! Please try again later";
    });
};
