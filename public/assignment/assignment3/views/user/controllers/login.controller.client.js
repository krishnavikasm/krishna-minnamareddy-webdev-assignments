var LoginController = function($routeParams, UserService, $location) {
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
    if(!UserService.findUserByCredentials(this.user.username, this.user.password)) {
       this.errorMessages = {
        invalidUser: errorMessages.invalidUser
       };
      return;
    }
    this.currentUser = UserService.findUserByCredentials(this.user.username, this.user.password);

    $location.path("/profile/"+this.currentUser._id);
  };
  this.register = function() {
    $location.path("/register");
  };
};
