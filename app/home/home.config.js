angular.module('weatherApp')
    .config(function($stateProvider, $urlRouterProvider){
        
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
            url : '/home',
            templateUrl : 'home/home.html',
            controller : 'HomeController',
            controllerAs : 'main'
        })
       
    })