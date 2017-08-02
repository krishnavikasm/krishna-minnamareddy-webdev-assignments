var app = angular.module("WebAppMaker", ['ngRoute']);

function setupRouting() {
  var Config = function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/user/templates/login.view.client.html",
        controller: "LoginController",
        controllerAs: "model"
      })
      .when("/login", {
        templateUrl: "views/user/templates/login.view.client.html",
        controller: "LoginController",
        controllerAs: "model"
      })
      .when("/profile", {
        templateUrl: "views/user/templates/profile.view.client.html"
      })
      .when("/default", { templateUrl: "views/user/login.view.client.html"})
      .when("/register", {
        templateUrl: "views/user/templates/register.view.client.html",
        controller: "RegisterController",
        controllerAs: "model",
      })
      .when("/profile/:uid", {
        templateUrl: "views/user/templates/profile.view.client.html",
        controller: "ProfileController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website", {
        templateUrl: "views/website/templates/website-list.view.client.html",
        controller: "WebsiteListController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website/new", {
        templateUrl: "views/website/templates/website-new.view.client.html",
        controller: "WebsiteNewController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website/:wid", {
        templateUrl: "views/website/templates/website-edit.view.client.html",
        controller: "WebsiteEditController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website/:wid/page", {
        templateUrl: "views/page/templates/page-list.view.client.html",
        controller: "PageController",
        controllerAs: "model",
      })
      .when("/profile/:uid/website/:wid/page/new", {
        templateUrl: "views/page/templates/page-new.view.client.html",
        controller: "PageController",
        controllerAs: "model",
      })
      .when("/profile/:uid/website/:wid/page/:pid", {
        templateUrl: "views/page/templates/page-edit.view.client.html",
        controller: "PageController",
        controllerAs: "model",
      })
      .when("/profile/:uid/website/:wid/page/:pid/widget", {
        templateUrl: "views/widget/templates/widget-list.view.client.html",
        controller: "WidgetController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website/:wid/page/:pid/widget/new", {
        templateUrl: "views/widget/templates/widget-chooser.view.client.html",
        controller: "WidgetController",
        controllerAs: "model"
      })
      .when("/profile/:uid/website/:wid/page/:pid/widget/:wgid", {
        templateUrl: "views/widget/templates/widget-edit.view.client.html",
        controller: "WidgetController",
        controllerAs: "model"
      }).otherwise({redirectTo: "/login"});
  };

  app.config(Config);
}


// annonimous function will be called only after all the resources are loaded
(function(){
  setupRouting();
  app.controller("LoginController", LoginController);
  app.controller("RegisterController", RegisterController);
  app.controller("ProfileController", ProfileController);
  app.controller("WebsiteListController", WebsiteListController);
  app.controller("WebsiteEditController", WebsiteEditController);
  app.controller("WebsiteNewController", WebsiteNewController);
  app.controller("PageController", PageController);
  app.controller("WidgetController", WidgetController);
})();
