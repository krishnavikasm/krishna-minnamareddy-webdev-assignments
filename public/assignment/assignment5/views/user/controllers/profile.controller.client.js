var ProfileController = function($scope, $routeParams, $http, $location) {
  var userId = $routeParams['uid'];
  if (userId == undefined || userId == null || userId.trim() == "") {
    this.errorMessage = "No UserId defined";
    return;
  }

  var controller = this;
  $http.get("/api/user/"+userId)
    .then(function(response) {
      if (response.status == 200 && response.data) {
        controller.user = response.data;
        if (controller.data == undefined) {
          throw "Something went wrong";
        }
      }
    })
    .catch(function(reason) {
      controller.errorMesaage = "Invalid userId";
    });

  this.updateUser = function() {
    if(Object.keys($scope.profile.$error).length != 0) {
      return;
    }
    $http.put("/api/user/"+userId, this.user)
      .then(function(response) {
        if (response.status == 200 && response.data) {
          if (!controller.data) {
            throw "Something went wrong";
          }
        }
      })
      .catch(function(reason) {
        controller.errorMesaage = "Error updating user";
      });
  };

  this.toProfile = function() {
    $location.path("/profile/"+userId);
  };

  this.logout = function() {
    $location.path("/login");
  };
  this.toWebsites = function() {
    $location.path("/profile/"+userId+"/website");
  };
};
