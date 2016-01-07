angular.module('weatherApp')
.controller('RegisterController', function(weatherService, $http) {

  var self = this;
  self.userName = "";
  self.userPassword ="";
  self.userEmail = "";
  self.registerAccount = registerAccount;

  $('#myModal').modal('hide');
  var user = {};

  function registerAccount(userName, userPassword, userEmail){
    console.log(self.userName + "  " + self.userPassword + "  " + self.userEmail);

    var newUser = { name: self.userName, password: self.userPassword, email: self.userEmail };
    return $http.post('/api/users', newUser);
  }
});