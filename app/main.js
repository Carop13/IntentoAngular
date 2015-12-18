angular.module('weatherApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
        
    $urlRouterProvider.otherwise('/');   

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
	
	
});