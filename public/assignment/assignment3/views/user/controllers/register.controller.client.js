var RegisterController = function($scope, $routeParams, UserService, $location) {
  this.register = function() {
    if (this.currentUser == undefined) {
      alert("Invalid Input");
      return ;
    }
    if (this.currentUser.username == undefined) {
      alert("password is required");
      return ;
    }
    if (this.currentUser.password == undefined) {
      alert("password is required");
      return ;
    }
    if (this.currentUser.verifypassword == undefined) {
      alert("password is required");
      return ;
    }
    if(this.currentUser.password != this.currentUser.verifypassword) {
      alert("Passwords should match");
      return ;
    }
    this.currentUser._id = Date().toString(),
    UserService.createUser(this.currentUser);
    $location.path("/profile/"+this.currentUser._id);
  };
  this.cancel = function() {
    $location.path("/");
  };
};
