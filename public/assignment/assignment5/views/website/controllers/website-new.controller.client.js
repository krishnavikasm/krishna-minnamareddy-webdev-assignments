var WebsiteNewController = function($scope, $routeParams, $http, $location) {
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
  this.toWebsitesList = function() {
    $location.path("/profile/"+userId+"/website");
  };
  this.saveAndMove = function() {
    var websiteId = this1.currentWebsite._id;
    $http.put("/api/website/"+websiteId, this.currentWebsite)
      .then(function(response) {
        if(response.status == 200) {
          this1.toWebsitesList();
        }
      })
      .error(function(error) {
        this1.errorMessage = "Some thing went wrong! Please try again later";
      });
  };

  this.newWebsite = function() {
    $http.post("/api/user/"+userId+"/website", this.currentWebsite)
      .then(function(response) {
        if(response.status == 200) {
          $http.get("/api/user/"+userId+"/website")
            .then(function(response) {
              if(response.data.size <= 0) {
                this1.errorMessage = "No Data to display";
              }
              if(response.status == 200) {
                this1.websites = response.data;
                this1.toWebsitesList();
              }
            })
            .catch(function(response) {
              this1.errorMessage = "Some thing went wrong! Please try again later";
            });
        }
      });
  };
};
