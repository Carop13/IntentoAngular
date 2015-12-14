angular.module('weatherApp')
  .factory('weatherService', function($http){

    function getWeather(city){
        alert(city);
        return $http.get('http://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=2de143494c0b295cca9337e1e96b00e0')

             .then(function(response){
               return response.data;
            }, function(error){
              console.log(error);
        }); 
    }

    return {
      'getWeather': getWeather
    };
});