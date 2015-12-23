angular.module('weatherApp')
.controller('ModalDialogController', function() {

  var self = this;
  self.show = false;
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
  self.unloadData = unloadData;
  

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
      console.log("You ara full connected!!!");
      document.getElementById('btn-login').innerHTML = "Sign Out";
      fBLoginSuccess();
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
      var accessToken = FB.getAuthResponse();
      console.log(accessToken);
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
        console.log("Logout");
        self.fbConnected = false;
       });
    };
    if(self.ggleConnected){
      auth2 = gapi.auth.signOut();
      console.log("Sign out Google");
    }
    unloadData();
    document.getElementById('btn-login').innerHTML = " Sign in ";
  };
  
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
        // console.log('Name: ' + self.profileGoogle.getName());
        // console.log('Image URL: ' + self.profileGoogle.getImageUrl());
        // console.log('Email: ' + self.profileGoogle.getEmail());
        
        console.log(self.profileGoogle.getName());
        document.getElementById('btn-login').innerHTML = "Sign Out";
        self.ggleConnected = true;
        
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




});     



