var app = angular.module("WebAppMaker", ['ngRoute']);

function setupRouting() {
  var Config = function($routeProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "views/user/login.view.client.html",
        controller: "LoginController",
        controllerAs: "model"
      })
      .when("/profile", { templateUrl: "views/user/profile.view.client.html"})
      .when("/default", { templateUrl: "views/user/login.view.client.html"})
      .when("/register", { templateUrl: "views/user/register.view.client.html"})
      .when("/profile/:uid", {
        templateUrl: "views/user/profile.view.client.html",
        controller: "ProfileController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website", {
        templateUrl: "views/user/website-list.view.client.html",
        controller: "WebsiteListController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website/new", {
        templateUrl: "views/user/website-new.view.client.html",
        controller: "WebsiteNewController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website/:wid", {
        templateUrl: "views/user/website-edit.view.client.html",
        controller: "WebsiteEditController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website/:wid/page", {
        templateUrl: "views/user/page-list.view.client.html",
        controller: "PageController",
        controllerAs: "model",
      })
      .when("/profile/:uid/website/:wid/page/new", {
        templateUrl: "views/user/page-new.view.client.html",
        controller: "PageController",
        controllerAs: "model",
      })
      .when("/profile/:uid/website/:wid/page/:pid", {
        templateUrl: "views/user/page-edit.view.client.html",
        controller: "PageController",
        controllerAs: "model",
      })
      .when("/profile/:uid/website/:wid/page/:pid/widget", {
        templateUrl: "views/user/widget-list.view.client.html",
        controller: "WidgetController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website/:wid/page/:pid/widget/new", {
        templateUrl: "views/user/widget-chooser.view.client.html",
        controller: "WidgetController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website/:wid/page/:pid/widget/:wgid", {
        templateUrl: "views/user/widget-edit.view.client.html",
        controller: "WidgetController",
        controllerAs: "model"
      }).otherwise("/login", {
        templateUrl: "views/user/login.view.client.html",
        controller: "LoginController",
        controllerAs: "model"
      });
  };

  app.config(Config);
}


// annonimous function will be called only after all the resources are loaded
(function(){
  setupRouting();
  app.factory("UserService", UserService);
  app.factory("WebsiteService", WebsiteService);
  app.factory("PageService", PageService);
  app.factory("WidgetService", WidgetService);
  app.controller("LoginController", LoginController);
  app.controller("ProfileController", ProfileController);
  app.controller("WebsiteListController", WebsiteListController);
  app.controller("WebsiteEditController", WebsiteEditController);
  app.controller("WebsiteNewController", WebsiteNewController);
  app.controller("PageController", PageController);
  app.controller("WidgetController", WidgetController);
})();
