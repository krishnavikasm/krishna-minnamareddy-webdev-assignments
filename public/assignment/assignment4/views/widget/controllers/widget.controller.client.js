var WidgetController = function($sce, $routeParams, $http, $location) {

  var userId = $routeParams.uid;
  var websiteId = $routeParams.wid;
  var pageId = $routeParams.pid;
  var widgetId = $routeParams.wgid;
  var this1 = this;

  this.callback = window.location.pathname + "#!/profile/"
    +userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
  if(!this.currentWidget) {
    this.currentWidget = {};
  }

  this.currentWidget.userId = userId;
  this.currentWidget.websiteId = websiteId;
  this.currentWidget.pageId = pageId;


  $http.get("/api/page/"+pageId+"/widget")
    .then(function(response) {
      if(response.status == 200) {
        this1.widgets = response.data;
      }})
    .catch(function(error) {
      this1.errorMessage = "Something went wrong";
    });

  $http.get("/api/widget/"+widgetId)
    .then(function(response) {
      if(response.status == 200) {
        this1.currentWidget = response.data;
      }
    })
    .catch(function(error) {
      this1.errorMessage = "Something went wrong";
    });

  this.getURL = function(widget) {
    return $sce.trustAsResourceUrl(widget.url);
  };

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

  this.active = function(id) {
    this.moveId = id;
  };

  this.updateIndex = function(initial, final) {
    $http.put("/page/"+pageId+"/widget?initial="+initial+"&final="+final)
      .then(function(response) {
        if(response.status == 200) {
        } else {
          throw "Error";
        }
      })
      .catch(function(error) {
        this.errorMessage = "Something went wrong";
      });
  };

  this.widgetList = function() {
    $location.path("/profile/"+userId+"/website/"
                   +websiteId+"/page/"+pageId+"/widget");
  };

  var createAndRedirect = function(widgetType) {
    var newWidgetId = Date().toString();
    this.currentWidget = {
      "_id": newWidgetId,
      widgetType
    };
    $http.post("/api/page/"+pageId+"/widget", this.currentWidget)
      .then(function(response) {
        if(response.status == 200) {
          $location.path("/profile/"+userId+"/website/"+websiteId+
                         "/page/"+pageId+"/widget/"+newWidgetId);
        }
      })
      .catch(function(error) {
        this1.errorMessage = "Something went wrong";
      });
  };

  this.goToWidgetHeading = function() {
    createAndRedirect("HEADING");
  };

  this.goToWidgetImage = function() {
    createAndRedirect("IMAGE");
  };
  this.goToWidgetYoutube = function() {
    createAndRedirect("YOUTUBE");
  };

  this.deleteMove = function(wgid) {
    $http.delete("/api/widget/"+wgid)
      .then(function(response) {
        if(response.status == 200) {
            this1.widgetList();
          }})
      .catch(function(error) {
        this1.errorMessage = "Some thing went wrong, Please try again later";
      });
  };
};
