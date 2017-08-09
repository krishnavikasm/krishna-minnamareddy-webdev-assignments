var LoginController = function($routeParams, $location, $http) {
  var errorMessages = {
    usernameUndefined: "Username is required",
    passwordUndefined: "Password is Undefined",
    invalidUser: "Either the username or the password is wrong",
  };
  this.login = function() {
    this.errorMessages = {
      username: undefined,
      password: undefined,
    };

    if (this.user == undefined) {
      this.errorMessages = {
        username: errorMessages.usernameUndefined,
        password: errorMessages.passwordUndefined
      };
      return;
    }
    if (this.user.username == undefined || this.user.username.trim() == "") {
      this.errorMessages = {
        username: errorMessages.usernameUndefined
      };
      return;
    }
    if (this.user.password == undefined || this.user.password.trim() == "") {
      this.errorMessages = {
        password: errorMessages.passwordUndefined
      };
      return;
    }
    var controller = this; $http.get("/api/user?username="+this.user.username+"&password="+this.user.password)
        .then((function(response) {
        if(response.status == 200 && response.data) {
          controller.currentUser = response.data;
          $location.path("/profile/"+controller.currentUser._id);
        } else {
          throw new Error("Some thing went wrong");
        }
      }))
      .catch(function(response) {
        controller.errorMessages = {
          invalidUser: errorMessages.invalidUser
        };
        return;
      });
  };
  this.register = function() {
    $location.path("/register");
  };
};
