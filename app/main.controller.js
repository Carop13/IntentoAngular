angular.module('weatherApp')
.controller('MainController', function(weatherService) {
      
  var self = this;
  self.city = '';
  self.show = false;
  
  self.currentWeather = {};

  self.getWeather = function getWeather(city){
    var promise = weatherService.getWeather(city)
    promise.then(function (weatherData) {
      self.currentWeather = weatherData;
      setMap();
      self.show = true;
    },
    function (reason) {
        
    });
  }

  function setMap() {
    var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(self.currentWeather.coord.lat, self.currentWeather.coord.lon),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    self.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  self.openInfoWindow = function(e, selectedMarker){
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
  }
});     


