angular.module('weatherApp')
	.config(function($stateProvider){
	    $stateProvider.state('maps',{
	    	url : '/maps',
	        templateUrl : 'maps/maps.html',
	        controller : 'MapsController',
	        controllerAs : 'main'
	    });
})