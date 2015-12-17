angular.module('weatherApp')
    .config(function($stateProvider, $urlRouterProvider){
        
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url : '/',
            templateUrl : 'home/home.html',
            controller : 'HomeController',
            controllerAs : 'main'
        })
       
    })