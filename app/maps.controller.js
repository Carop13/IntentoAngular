//Angular App Module and Controller
angular.module('weatherApp')
.controller('MapCtrl', function ($scope) {
  $scope.latitud = '';
  $scope.longitud = '';
  function SecondController($scope) {
    $scope.$emit('someEvent', latitud, longitud);
    $scope.latitud = latitud;
    $scope.longitud = longitud;
  }

  var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(6.25,-75.56),
      mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $scope.markers = [];
  
  var infoWindow = new google.maps.InfoWindow();
  
  var createMarker = function (info){
      
      var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(info.lat, info.long),
          title: info.city
      });
      marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
      
      google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
          infoWindow.open($scope.map, marker);
      });
      
      $scope.markers.push(marker);
      
  }  
  
  $scope.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
  }

});