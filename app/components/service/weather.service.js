angular.module('weatherApp')
.factory('weatherService', function($http){
  var firstPart = 'http://api.openweathermap.org/data/2.5/weather?';
  var secondPart = '&appid=44db6a862fba0b067b1930da0d769e98'

  function getWeather(city){
    return $http.get(firstPart + 'q=' + city + secondPart).then(function(response){
        return response.data;
      }, function(error){
        console.log(error);
      }); 
  }

  function getWeatherByLatLng(lat, lng){
    return $http.get(
      firstPart + 'lat=' + lat + '&lon=' + lng + secondPart).then(function(response){
        return response.data;
      }, function(error){
        console.log(error);
      }); 
  }

  return {
    'getWeather': getWeather,
    'getWeatherByLatLng': getWeatherByLatLng
  };
});