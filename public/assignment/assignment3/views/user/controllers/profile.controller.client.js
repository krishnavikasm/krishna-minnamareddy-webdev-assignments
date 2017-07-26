var ProfileController = function($scope, $routeParams, UserService, $location) {
  var userId = $routeParams['uid'];
  if (userId == undefined || userId == null || userId.trim() == "") {
    this.errorMessage = "No UserId defined";
    return;
  }
  this.user = UserService.findUserById(userId);
  if (this.user == undefined) {
    this.errorMesaage = "Invalid userId";
  }
  this.updateUser = function() {
    if(Object.keys($scope.profile.$error).length != 0) {
      return;
    }
    UserService.updateUser(this.user._id, this.user);
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
