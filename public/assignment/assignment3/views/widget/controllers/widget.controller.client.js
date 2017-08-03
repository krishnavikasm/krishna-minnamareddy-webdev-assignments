var WidgetController = function($scope, $routeParams, WidgetService, $location, PageService) {
  var userId = $routeParams.uid;
  var websiteId = $routeParams.wid;
  var pageId = $routeParams.pid;
  var widgetId = $routeParams.wgid;
  this.widgets = WidgetService.findWidgetsByPageId(pageId);
  this.currentWidget = WidgetService.findWidgetsById(widgetId);

  this.toProfile = function() {
    $location.path("/profile/"+userId);
  };

  this.toPageList = function() {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page");
  };

  this.addWidget = function() {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/new");
  };

  this.widgetEdit = function(wgid) {
    $location.path("/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+wgid);
  };

  this.saveWidget = function() {
    WidgetService.updateWidget(this.currentWidget._id, this.currentWidget);
    this.widgetList();
  };

  this.widgetList = function() {
    $location.path("/profile/"+userId+"/website/"+
                   websiteId+"/page/"+pageId+"/widget");
  };

  this.goToWidgetHeading = function() {
    this.currentWidget = {
      "_id": Date().toString(),
      widgetType: "HEADING",
    };
    WidgetService.createWidget(pageId, this.currentWidget); $location.path("/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+this.currentWidget._id);
  };

  this.goToWidgetImage = function() {
    this.currentWidget = {
      "_id": Date().toString(),
      widgetType: "IMAGE",
    };
    WidgetService.createWidget(pageId, this.currentWidget); $location.path("/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+this.currentWidget._id);
  };
  this.goToWidgetYoutube = function() {
    this.currentWidget = {
      "_id": Date().toString(),
      widgetType: "YOUTUBE",
    };
    WidgetService.createWidget(pageId, this.currentWidget); $location.path("/profile/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+this.currentWidget._id);
  };

  this.deleteMove = function(wgid) {
    console.log('hello');
    WidgetService.deleteWidget(wgid);
    this.toPageList();
  };
};
