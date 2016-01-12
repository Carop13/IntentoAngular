angular.module('weatherApp')
.controller('ModalLoginController', function(userService, $http) {

  var self = this;
  self.show = false;
  var idExist = false;
  var anUser = false;
  var forFB = false;
  var forGGle = false;
  var newUserId = "";
  var newUserName = "";
  self.name = 'Login please';
  self.fBLogin = fBLogin;
  self.startApp = startApp;
  self.attachSignin = attachSignin;
  self.startApp();
  self.loadData = loadData;
  self.logout = logout;
  self.fBStatus = fBStatus;
  self.statusChangeCallback = statusChangeCallback;
  self.fBLoginSuccess = fBLoginSuccess;
  self.fbConnected = false;
  self.ggleConnected = false;
  self.profileGoogle = "";
  self.ggleID = "";
  self.fbProfile = "";
  self.unloadData = unloadData;
  self.getUser = getUser;
  self.username = "";
  self.password = "";
  self.account = account;
  self.modalComments = modalComments;
  self.logInAccount= logInAccount;

  //////////////////////////////////////////////////////////////////////
  
  //   Facebook
   function fBLogin(){
    FB.login(function(response) {
      if(response.authResponse){
        fBLoginSuccess();
      } else{
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  };

  function fBStatus(){
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
  }

  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      fBLoginSuccess();
      $('#myModal').modal('hide');
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      fBLogin();
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      fBLogin();
    }
  }

  function fBLoginSuccess() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      self.fbProfile = response;
      // console.log(response);
      var accessToken = FB.getAuthResponse();
      //console.log(accessToken);
      document.getElementById('myComments').innerHTML = "Sign in";
      forFB = true;
      getUser();
    });
    document.getElementById('btn-login').innerHTML = "Sign Out";
    self.fbConnected = true;
    loadData();
  }

  function logout(){
    //facebook disconnect
    if(self.fbConnected){
      FB.logout(function(response) {
      // Person is now logged out
        self.fbConnected = false;
       });
    };
    if(self.ggleConnected){
      auth2 = gapi.auth.signOut();
    }
    unloadData();
    document.getElementById('btn-login').innerHTML = " Sign in ";
  };

  //////////////////////////////////////////////////////////////////////

  // google sign in
  var googleUser = {};
  function startApp() {
    gapi.load('auth2', function(){
      // Retrieve the singleton for the GoogleAuth library and set up the client.
     auth2 = gapi.auth2.init({
        client_id: '31313449476-a119alt1t7ijufl2437sp93386o221qo.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
     
      self.attachSignin(document.getElementById('customBtn'));
    });
  };

  function attachSignin(element) {
    auth2.attachClickHandler(element, {},
      function(googleUser) {
        self.profileGoogle = googleUser.getBasicProfile();
        document.getElementById('myComments').innerHTML = "Sign in";
        modalComments("Welcome " + self.profileGoogle.getName());
        document.getElementById('btn-login').innerHTML = "Sign Out";
        $('#myModal').modal('hide');
        self.ggleConnected = true;
        // console.log(self.profileGoogle);
        forGGle = true;
        getUser();
        
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
    
  }
 
  function loadData(){
    self.show = true;
  }
  function unloadData(){
    self.show = false;
  }
 
 //////////////////////////////////////////////////////////////////////

  function welcomeModal(name){
    $('#myModal').modal('hide');
    return modalComments(name);
  }


  function account(username, password){
    // console.log(self.username + "  " + self.password);
    if(self.username == "" || self.password == "" 
      || self.username == undefined || self.password == undefined ){
      modalComments("Fill all the information");
    }else{
      anUser = true;
      getUser();
      
    }
  };

  function getUser(){
    userService.getUserInformation()
    .then(function (userData) {
      //console.log(userData);
       self.userData = userData;
      logInAccount();
    });
  }

  function modalComments(comment){
    document.getElementById('infoShow').innerHTML = comment;
    $('#myModalComment').modal('show');
  }

  function logInAccount(){
    document.getElementById('myComments').innerHTML = "";
    for(var i = 0; i < self.userData.length; i++){
      if(anUser){
        if(self.username == self.userData[i].name && self.password == self.userData[i].password){
          document.getElementById('btn-login').innerHTML = "Sign Out";
          return welcomeModal(" Welcome " + self.username);
        }else{
          return welcomeModal(" Username or password is wrong! ");
        }
      }else if(forFB){
        newUserId = self.fbProfile.id;
        newUserName = self.fbProfile.name;
        if(self.userData[i].id == self.fbProfile.id){
          idExist = true;
          welcomeModal( "Welcome " + newUserName);
          // document.getElementById('btn-login').innerHTML = "Sign Out";
          return console.log("User exist");
        }
      } else if(forGGle){
        newUserId = self.profileGoogle.getId();
        newUserName = self.profileGoogle.getName();
        // console.log(newUserId + " " + newUserName);
        if(self.userData[i].id == self.profileGoogle.getId()){
          idExist = true;
          welcomeModal( "Welcome " + newUserName);
          return console.log("User exist");
        }
      }

    };
    if(!idExist){
      var newUser = { id: newUserId, name: newUserName };
      return $http.post('/api/users', newUser);
      welcomeModal( "Welcome " + newUserName);
    }
  }

});     



