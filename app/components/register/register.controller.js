angular.module('weatherApp')
.controller('RegisterController', function(userService, $http) {

  var self = this;
  self.userName = "";
  self.userPassword = "";
  self.userEmail = "";
  self.registerAccount = registerAccount;
  self.checkEmail = checkEmail;
  self.userData;
  var equalEmail = false;
  var existName = false;
  var comment = "";
  $('#myModal').modal('hide');

  function registerAccount(userName, userPassword, userEmail){
    console.log(self.userName + "  " + self.userPassword + "  " + self.userEmail);
    if(self.userName == "" || self.userPassword == "" || self.userEmail == "" 
      || self.userName == undefined || self.userPassword == undefined 
      || self.userEmail == undefined ){
      document.getElementById('infoShow').innerHTML = "Fill all the information right";
      $('#myModalComment').modal('show');
    }else{
      userService.getUserInformation()
      .then(function (userData) {
        console.log(userData);
        self.userData = userData;
        checkEmail();
      });
    }
  };

  function checkEmail(){
    for(var i = 0; i < self.userData.length; i++){  
      if(self.userName == self.userData[i].name){
        existName = true;
        comment = comment + "Username, ";
      }
      if(self.userEmail == self.userData[i].email){
        comment = comment + "Email ";
        equalEmail = true;
      }
    };
    if(!equalEmail && !existName){
      var newUser = { name: self.userName, password: self.userPassword, email: self.userEmail };
      self.userName = "";
      self.userPassword = "";
      self.userEmail = "";
      return $http.post('/api/users', newUser);
    }
    if(existName || equalEmail){
      document.getElementById('infoShow').innerHTML = comment + "all ready exist!";
      $('#myModalComment').modal('show');
      comment = "";
      existName = false;
      equalEmail = false;
    }
  };

});