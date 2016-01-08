angular.module('weatherApp')
.factory('userService', function($http){

  function getUserInformation(){
    return $http.get('/api/users').then(function(response){
      return response.data;
    }, function(error){
        console.log(error);
    }); 
  };

  function getFBUserInformation(){
    return $http.get('/api/fbusers').then(function(response){
      return response.data;
    }, function(error){
        console.log(error);
    }); 
  };

  return {
    'getUserInformation': getUserInformation,
    'getFBUserInformation': getFBUserInformation
  };
});