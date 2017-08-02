var WebsiteEditController = function($scope, $routeParams, $http, $location) {
  var userId = $routeParams['uid'];
  var websiteId = $routeParams['wid'];
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
  this.toWebsitesList = function() {
    $location.path("/profile/"+userId+"/website");
  };
  this.saveAndMove = function() {
    $http.put("/api/website/"+websiteId, this.currentWebsite)
      .then(function(response) {
        if(response.status == 200) {
          this1.toWebsitesList();
        }
      })
      .catch(function(error) {
        this1.errorMessage = "Some thing went wrong please try again later";
      });
  };
  this.deleteWebsite = function() {
    $http.delete("/api/website/"+websiteId)
      .then(function(response) {
        if(response.status == 200) {
          this1.toWebsitesList();
          return;
        }
        throw "Error";
      })
      .catch(function(error) {
        this1.errorMessage = "Something went wrong Please try again later";
      });
  };

  $http.get("/api/user/"+userId+"/website")
    .then(function(response) {
      if (response.data.size <= 0) {
        this1.errorMessage = "There is no data";
      }
      if(response.status == 200) {
        this1.websites = response.data;
      }
    })
    .catch(function(error) {
      this1.errorMessage = "Some thing went wrong Please try again later";
    });
  $http.get("/api/website/"+websiteId)
    .then(function(response) {
      if(response.status == 200) {
        this1.currentWebsite = response.data;
      }
    })
    .catch(function(response) {
      this1.errorMessage = "something went wrong Please try again later";
    });
};
