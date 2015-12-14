angular.module('weatherApp')
    .controller('MainController', function(weatherService) {
        
        var self = this;

        self.city = '';
        self.currentWeather = {};
        
        self.getWeather = function getWeather(city){
            var promise = weatherService.getWeather(city)
            promise.then(function (weatherData) {
                self.currentWeather = weatherData;
            },
            function (reason) {
                
            });
        }

});     


