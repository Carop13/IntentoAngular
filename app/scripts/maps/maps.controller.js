angular.module('weatherApp')
.controller('MapsController', function(weatherService) {
      
    var self = this;
    self.city = '';
    self.show = false;
    self.currentWeather = {};
    self.currentWeatherByLatLng = {};

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
        self.newFavorite(city);
    }

    //variables map
    var posibleAddMarkers = true;
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;
    self.map;
    self.markers = [];
    self.marker;

    // Deploy Map Country
    self.setMap = function setMap() {
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

    var markerObj = {};
    var newMarker;
    //This function add a marker to the map
    self.addMarker = function addMarker(location){
        // TODO: addMarkersEnabled
        if(!posibleAddMarkers){
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
                    // TODO: display info window saying your internet is bad and you should feel bad.
                });
        });

        new google.maps.event.trigger( newMarker, 'click' );
    }

    self.infoWindowMarker = function infoWindowMarker(weatherInfo){
         // Construct a new InfoWindow.
        markerObj.weatherInfo = weatherInfo;
        var infoWindow = new google.maps.InfoWindow({
            content: weatherInfo.weather[0].description
        });
        infoWindow.open(self.map, newMarker);
    }

    var cont = 0;
    self.canAddMarkers = function canAddMarkers(){
        if(cont === 1){
            posibleAddMarkers = true;
            cont--;
        }else{
            posibleAddMarkers = false;
            cont++;
        }
        
    }

    // Sets the map on all markers in the array.
    self.setMapOnAll = function setMapOnAll(map) {
        for (var i = 0; i < self.markers.length; i++) {
            self.markers[i].marker.setMap(map);
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
        labelIndex = 0;
        self.markers = [];
    }

    //Delete a specific infoWindow
    self.deteleMarkerById = function deteleMarkerById(id) {
        //Find and remove the marker from the Array
        for (var i = 0; i < self.markers.length; i++) {
            if (self.markers[i].marker.id === id) {
                //Remove the marker from Map                  
                self.showMarkers();
 
                //Remove the marker from array.
                self.markers.splice(i, 1);
            }
        }
    }

    self.favorites = ['Medellin', 'London', 'New York', 'Berlin', 'Toronto', 'Wellington', 'Halifax']; 

    self.searchFavorite = function searchFavorite(favorite){
        self.getWeather(favorite);
    } 

    self.newFavorite = function newFavorite(city){
        var equal = false; 
        for(var i = 0; i < self.favorites.length; i++){
            if(city.toUpperCase() == self.favorites[i].toUpperCase()){
                equal = true;
            }
        }
        if(!equal){
            if(confirm("Add this place as favorite?")){
                self.favorites.push(city.charAt(0).toUpperCase() + city.slice(1).toLowerCase());
            }
        }
        
    }
});     
