angular.module('weatherApp')
.config(function($stateProvider, $urlRouterProvider){

    $stateProvider.state('maps',{
    	url : '/maps',
        templateUrl : 'scripts/maps/maps.html',
        controller : 'MapsController',
        controllerAs : 'maps',
    })
    .state('maps.modal', {
	    url: '/',
	    templateUrl: 'scripts/modals/modal.dialog.html',
	    controller : 'ModalDialogController',
	    controllerAs : 'modal'
	});
})