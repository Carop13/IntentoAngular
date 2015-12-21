angular.module('weatherApp')
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('maps',{
    url : '/maps',
    templateUrl : 'components/maps/maps.html',
    controller : 'MapsController',
    controllerAs : 'maps',
  })
})