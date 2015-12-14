angular.module('IntentoAngularJs', [])
    .controller('MainController', function($scope, $http){
        $scope.city = '';
        $scope.currentWeather = {};
        $scope.getBanana = getWeather;
        //Promise

        function getWeather(){
         $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.city +'&appid=2de143494c0b295cca9337e1e96b00e0')
         .then(function(response){
             $scope.currentWeather = response.data;
         }, function(error){
             console.log(error);
         });
        }

});     