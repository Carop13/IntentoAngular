angular.module('weatherApp')
    .config(function($stateProvider, $urlRouterProvider){
        
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url : '/',
            templateUrl : 'home.html',
            controller : 'MainController',
            controllerAs : 'main'
        })
        .state('maps',{
        	url : '/maps',
            templateUrl : 'maps/maps.html',
            controller : 'MapsController',
            controllerAs : 'main'
        });
    })