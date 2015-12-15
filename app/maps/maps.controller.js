angular.module('weatherApp')
.controller('MapsController', function(weatherService) {
      
  var self = this;
  self.city = '';
  self.show = false;
  
  self.currentWeather = {};
  self.markers = [];

  // Call the service http function
  self.getWeather = function getWeather(city){
    var promise = weatherService.getWeather(city)
    promise.then(function (weatherData) {
      self.currentWeather = weatherData;
      self.show = true;
      setMap();
      self.markers.push(city);
    },
    function (reason) {
        
    });
    if(self.markers.length >= 1){
      marker();
    }
    
  }

  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;
  var map;
  // Deploy Map Country
  function setMap() {
    var myLatLng = { 
      lat: self.currentWeather.coord.lat,
      lng: self.currentWeather.coord.lon
    };

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: myLatLng
    });

    // This event listener calls addMarker() when the map is clicked.
    map.addListener('click', function(event){
      self.addMarker(event.latLng);
    });

    // Add a marker at the center of the map.
    self.addMarker(myLatLng);
  }

  // This function is to move free in the map
  // self.openInfoWindow = function(e, selectedMarker){
  //   e.preventDefault();
  //   google.maps.event.trigger(selectedMarker, 'click');
  // }

  // This is to know which cities the user have search
  self.marker = function marker(){
    console.log("-----------");
    for(var i = 0; i <= self.markers.length-1; i++){
      console.log(self.markers[i]);
    }
  }

  //This function add a marker to the map
  self.addMarker = function addMarker(location){
    var marker = new google.maps.Marker({
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: map,
    });
  }

});     
