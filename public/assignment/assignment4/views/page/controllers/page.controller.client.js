var PageController = function($scope, $routeParams, $http, $location) {
  var userId = $routeParams.uid;
  var websiteId = $routeParams.wid;
  var pageId = $routeParams.pid;

  var this1 = this;
  $http.get("/api/website/"+websiteId+"/page").then(function(response) {
    if(response.status == 200) {
      this1.pages = response.data;
    }
  }).then(function() {
    $http.get("/api/page/"+pageId).then(function(response) {
      if(response.status == 200) {
        if(response.data) {
          this1.currentPage = response.data;
        }
      }
    });
  }).catch(function(error) {
    this1.errorMessage = "Something went wrong";
  });

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
    $http.post("/api/website/"+websiteId+"/page", this.currentPage)
      .then(function(response) {
        if(response.status == 200) {
          this1.toPageList();
        }
      })
      .catch(function(error) {
        this1.errorMessage = "Please try again later";
      });
  };

  this.deleteAndMove = function() {
    $http.delete("/api/page/"+pageId)
      .then(function(response) {
        if(response.status == 200) {
          this1.toPageList();
        }
      })
      .catch(function(error) {
        this1.errorMessage = "Please try again later";
      });
  };

  this.toPageEdit = function(pageId) {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page/"+pageId);
  };
};
