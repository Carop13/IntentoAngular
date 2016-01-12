angular.module('weatherApp')
.factory('userService', function($http){

  function getUserInformation(){
    return $http.get('/api/users').then(function(response){
      return response.data;
    }, function(error){
        console.log(error);
    }); 
  };

  function getUserInformationById(id){
    return $http.get('/api/users', {id: id}).then(function(response){
      return response.data;
    }, function(error){
        console.log(error);
    }); 
  };

  return {
    'getUserInformation': getUserInformation
  };
});