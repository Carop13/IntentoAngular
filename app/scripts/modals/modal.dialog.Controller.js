angular.module('weatherApp')
.controller('ModalDialogController', function() {

	var self = this;

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

	self.onSignIn = function onSignIn(googleUser) {
	  var profile = googleUser.getBasicProfile();
	  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	  console.log('Name: ' + profile.getName());
	  console.log('Image URL: ' + profile.getImageUrl());
	  console.log('Email: ' + profile.getEmail());
	}

	self.signOut = function signOut() {
	    var auth2 = gapi.auth2.getAuthInstance();
	    auth2.signOut().then(function () {
	      console.log('User signed out.');
	    });
	}

});     



