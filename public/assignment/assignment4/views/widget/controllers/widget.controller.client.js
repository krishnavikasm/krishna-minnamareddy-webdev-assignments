var WidgetController = function($scope, $routeParams, $http, $location, PageService) {
  var userId = $routeParams.uid;
  var websiteId = $routeParams.wid;
  var pageId = $routeParams.pid;
  var widgetId = $routeParams.wgid;
  var this1 = this;
  
  $http.get("/api/page/"+pageId+"/widget")
    .then(function(response) {
      if(response.status == 200) {
        this1.widgets = response.body;
      }
    })
    .catch(function(error) {
      this1.errorMessage = "Something went wrong";
    });

  $http.get("/api/widget/"+widgetId)
    .then(function(response) {
      if(response.status == 200) {
        this1.currentWidget = response.body;
      }
    })
    .catch(function(error) {
      this1.errorMessage = "Something went wrong";
    });

  this.toProfile = function() {
    $location.path("/profile/"+userId);
  };

  this.toPageList = function() {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page");
  };

  this.addWidget = function() {
    $location.path("/profile/"+userId+"/website/"
                   +websiteId+"/page/"+pageId+"/widget/new");
  };

  this.widgetEdit = function(wgid) {
    $location.path("/profile/"+userId+"/website/"
                   +websiteId+"/page/"+pageId+"/widget/"+wgid);
  };

  this.saveWidget = function() {
    $http.put("/api/widget/"+widgetId, this.currentWidget)
      .then(function(response){
        if(response.status == 200) {
          this1.widgetList();
        }
      })
      .catch(function(error) {
        this1.errorMessage = "Something went wrong";
      });
  };

  this.widgetList = function() {
    $location.path("/profile/"+userId+"/website/"
                   +websiteId+"/page/"+pageId+"/widget");
  };

  var createAndRedirect = function() {
    $http.post("/api/page/"+pageId+"/widget", this.currentWidget)
      .then(function(response) {
        if(response.status == 200) {
          $location.path("/profile/"+userId+"/website/"+websiteId+
                         "/page/"+pageId+"/widget/"+this.currentWidget._id);
        }
      })
      .catch(function(error) {
        this1.errorMessage = "Something went wrong";
      });
  };

  this.goToWidgetHeading = function() {
    this.currentWidget = {
      "_id": Date().toString(),
      widgetType: "HEADING",
    };
    createAndRedirect();
  };

  this.goToWidgetImage = function() {
    this.currentWidget = {
      "_id": Date().toString(),
      widgetType: "IMAGE",
    };
    createAndRedirect();
  };
  this.goToWidgetYoutube = function() {
    this.currentWidget = {
      "_id": Date().toString(),
      widgetType: "YOUTUBE",
    };
    createAndRedirect();
  };

  this.deleteMove = function(wgid) {
    console.log('hello');
    WidgetService.deleteWidget(wgid);
    this.toPageList();
  };
};
