angular.module('weatherApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
        
    $urlRouterProvider.otherwise('/');   
});