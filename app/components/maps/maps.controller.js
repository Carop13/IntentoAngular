angular.module('weatherApp')
.controller('MapsController', function(weatherService) {
      
  var self = this;
  self.city = '';
  self.show = false;
  self.currentWeather = {};
  self.currentWeatherByLatLng = {};
  self.getWeather = getWeather;
  self.setMap = setMap;
  self.addMarker = addMarker;
  self.infoWindowMarker = infoWindowMarker;
  self.canAddMarkers = canAddMarkers;
  self.setMapOnAll = setMapOnAll;
  self.clearMarkers = clearMarkers;
  self.showMarkers = showMarkers;
  self.deleteMarkers = deleteMarkers;
  self.searchFavorite = searchFavorite;
  self.gplusShare = gplusShare;
   //variables map
  var addMarkersEnabled = true;
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;
  self.map;
  self.markers = [];
  var markerObj = {};
  var newMarker;
  var cont = 0;
  

  // Call the service http function
  function getWeather(city){
    if(city == ""){
      document.getElementById('infoShow').innerHTML = "Add a city pleace";
      $('#myModalComment').modal('show');
    }else{
      var promise = weatherService.getWeather(city)
      promise.then(function (weatherData) {
        if(weatherData.message == "Error: Not found city"){
          document.getElementById('infoShow').innerHTML = "Add available city";
          $('#myModalComment').modal('show');
        }else{
          self.currentWeather = weatherData;
          self.show = true;
          self.setMap();
        }
      },
      function (reason) {
         
      });
    }
  }

  // Deploy Map Country
  function setMap() {
    var myLatLng = { 
    lat: self.currentWeather.coord.lat,
    lng: self.currentWeather.coord.lon
    };

    self.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
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
  function addMarker(location){
    // TODO: addMarkersEnabled
    if(!addMarkersEnabled){
      return;
    }
    newMarker = new google.maps.Marker({
      id: labelIndex,
      position: location,
      label: labels[labelIndex++ % labels.length],
      map: self.map,
      draggable: true,
    });

    markerObj = {marker: newMarker, weatherInfo:null};
    self.markers.push(markerObj);        

    google.maps.event.addListener(newMarker, 'click', function(event){
      if(markerObj.weatherInfo && markerObj.marker.position){
        self.infoWindowMarker(markerObj.weatherInfo);
      }
      weatherService.getWeatherByLatLng(newMarker.position.lat(), newMarker.position.lng())
        .then(function(weatherInfo) {
         self.infoWindowMarker(weatherInfo);
        },
        function(reason) {
          document.getElementById('infoShow').innerHTML = " Your internet is bad and you should feel bad.";
          $('#myModalComment').modal('show');
        });
    });

    new google.maps.event.trigger(newMarker, 'click' );
  }

  function infoWindowMarker(weatherInfo){
     // Construct a new InfoWindow.
    var actualCity = weatherInfo.name;
    var actualWheater = weatherInfo.weather[0].description.charAt(0).toUpperCase() + weatherInfo.weather[0].description.slice(1).toLowerCase()
    markerObj.weatherInfo = weatherInfo;
    var infoWindow = new google.maps.InfoWindow({
      content:'<p class="actual-weather">'+ actualWheater +'</p> <a onclick="newFavorite(\'' + actualCity + '\')"> <span class="glyphicon glyphicon-star"></span>  Add to favorites</a>'
    });
    infoWindow.open(self.map, newMarker);
  }
  
  function canAddMarkers(){
    if(cont === 1){
      addMarkersEnabled = true;
      cont--;
    }else{
      addMarkersEnabled = false;
      cont++;
    }
      
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < self.markers.length; i++) {
      self.markers[i].marker.setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    self.setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    self.setMapOnAll(self.map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    self.clearMarkers();
    labelIndex = 0;
    self.markers = [];
  }

  self.favorites = ['Medellin', 'London', 'New York', 'Berlin', 'Toronto', 'Wellington', 'Halifax']; 

  function searchFavorite(favorite){
    self.getWeather(favorite);
  } 

  window.newFavorite = function (actualCity){
    var equal = false; 
    for(var i = 0; i < self.favorites.length; i++){
      if(actualCity.toUpperCase() == self.favorites[i].toUpperCase()){
        equal = true; 
        document.getElementById('infoShow').innerHTML = actualCity + " is all ready in favorites!";
        $('#myModalComment').modal('show');
      }
    }
    if(!equal){
      self.favorites.push(actualCity.charAt(0).toUpperCase() + actualCity.slice(1).toLowerCase());
      document.getElementById('infoShow').innerHTML = actualCity + " have been add to favorites!";
      $('#myModalComment').modal('show');
    }
  }

  var currentURL = "http://127.0.0.1:8080/maps.html";
  function gplusShare() {
    window.open("https://plus.google.com/share?url="+currentURL,"","height=550,width=525,left=100,top=100,menubar=0");
    return false;
  }

 
});     
