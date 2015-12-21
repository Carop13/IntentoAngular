angular.module('weatherApp')
.factory('weatherService', function($http){
  var firstPart = 'http://api.openweathermap.org/data/2.5/weather?';
  var secondPart = '&appid=2de143494c0b295cca9337e1e96b00e0'

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