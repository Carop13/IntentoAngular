angular.module('weatherApp')
.controller('RegisterController', function(weatherService, $http) {

  var self = this;
  self.userName = "";
  self.userPassword ="";
  self.userEmail = "";
  self.registerAccount = registerAccount;
  self.getUserEmail = getUserEmail;
  self.checkEmail = checkEmail;
  self.emailData;
  $('#myModal').modal('hide');

  function registerAccount(userName, userPassword, userEmail){
    console.log(self.userName + "  " + self.userPassword + "  " + self.userEmail);
    if(self.userName == " " || self.userPassword == "" || self.userEmail == ""){
      document.getElementById('infoShow').innerHTML = "Fill all the information";
      $('#myModalComment').modal('show');
    }else{
      getUserEmail().then(function (emailUser) {
        self.emailData = emailUser; 
        checkEmail();
      });
    }
  };

  function checkEmail(){
    for(var i = 0; i <= self.emailData.length; i++){  
      console.log(self.emailData[i].email);
      if(self.userEmail === self.emailData[i].email){
        document.getElementById('infoShow').innerHTML = "Email all ready exist";
        $('#myModalComment').modal('show');
      }
      var newUser = { name: self.userName, password: self.userPassword, email: self.userEmail };
      return $http.post('/api/users', newUser);
    };
  };

  function getUserEmail(){
    return $http.get('/api/users').then(function(response){
      return response.data;
    }, function(error){
        console.log(error);
    }); 
  };


});