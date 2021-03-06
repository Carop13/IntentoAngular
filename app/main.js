angular.module('weatherApp', ['ui.router'])
.config(function(){

    window.fbAsyncInit = function() {
        FB.init({
          appId      : '1644758169145041',
          status: true, 
          cookie: true, 
          xfbml: true,
          version    : 'v2.5'
        });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=1644758169145041";
       fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();

})
.run(function($http){
  $http.defaults.headers.common['Content-Type'] = 'application/json';
});