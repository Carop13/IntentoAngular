angular.module('weatherApp')
  .factory('weatherByLatLngService', function($http){

  function getWeatherByLatLng(lat, lng){
    return $http.get(
      'http://api.openweathermap.org/data/2.5/weather?lat='
      + lat + '&lon=' + lng
      + '&appid=2de143494c0b295cca9337e1e96b00e0')
      .then(function(response){
        return response.data;
      }, function(error){
        console.log(error);
      }); 
  }
  return {
    'getWeatherByLatLng': getWeatherByLatLng
  };

});