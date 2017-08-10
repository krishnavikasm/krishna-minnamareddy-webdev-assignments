var RegisterController = function($scope, $routeParams, $location, $http) {
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
    $http.post("/api/user", this.currentUser).then(function(response) {
      if (response.status == 200) {
        $location.path("/profile/"+this.currentUser._id);
      }
    }).catch(function(error) {
      this.errorMessages = "Some thing went wrong while creating a new user ";
    });
  };
  this.cancel = function() {
    $location.path("/");
  };
};
