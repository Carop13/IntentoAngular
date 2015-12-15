angular.module('weatherApp')
.controller('MapsController', function(weatherService) {
      
  var self = this;
  self.city = '';
  self.show = false;
  
  self.currentWeather = {};

  // Call the service http function
  self.getWeather = function getWeather(city){
    var promise = weatherService.getWeather(city)
    promise.then(function (weatherData) {
      self.currentWeather = weatherData;
      self.show = true;
      self.setMap();
    },
    function (reason) {
        
    });
    
  }

  //variables map
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;
  self.map;
  self.markers = [];

  // Deploy Map Country
  self.setMap = function setMap() {
    var myLatLng = { 
      lat: self.currentWeather.coord.lat,
      lng: self.currentWeather.coord.lon
    };

    self.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: myLatLng
    });

    // This event listener calls addMarker() when the map is clicked.
    self.map.addListener('click', function(event){
      self.addMarker(event.latLng);
    });

    // Add a marker at the center of the map.
    self.addMarker(myLatLng);
  }

  //This function add a marker to the map
  self.addMarker = function addMarker(location){
    var marker = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: self.map,
    });
    self.markers.push(marker);
  }

  // Sets the map on all markers in the array.
  self.setMapOnAll = function setMapOnAll(map) {
    for (var i = 0; i < self.markers.length; i++) {
      self.markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  self.clearMarkers = function clearMarkers() {
    self.setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  self.showMarkers = function showMarkers() {
    self.setMapOnAll(self.map);
  }

  // Deletes all markers in the array by removing references to them.
  self.deleteMarkers = function deleteMarkers() {
    self.clearMarkers();
    self.markers = [];
  }

});     
