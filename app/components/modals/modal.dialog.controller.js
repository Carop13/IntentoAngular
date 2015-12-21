angular.module('weatherApp')
.controller('ModalDialogController', function() {

  var self = this;
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1644758169145041',
      xfbml      : true,
      version    : 'v2.5'
    });

  };

  (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/client:plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
  //   Facebook
  self.name = 'Login please';
  self.FBLogin = function FBLogin(){
    FB.login(function(response) {
      if(response.authResponse){
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Good to see you, ' + response.name + '.');
          console.log(response);
          var accessToken = FB.getAuthResponse();
          console.log(accessToken);
        });
      } else{
        console.log('User cancelled login or did not fully authorize.');
      }
        
      });
  };

  // google sign in
  var googleUser = {};
  self.startApp = function startApp() {
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

  self.attachSignin = function attachSignin(element) {
    auth2.attachClickHandler(element, {},
      function(googleUser) {
        self.profile = googleUser.getBasicProfile();
        console.log('Name: ' + self.profile.getName());
        console.log('Image URL: ' + self.profile.getImageUrl());
        console.log('Email: ' + self.profile.getEmail());

      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

});     



