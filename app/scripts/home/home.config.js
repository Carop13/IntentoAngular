angular.module('weatherApp')
.config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url : '/',
        templateUrl : 'scripts/home/home.html',
        controller : 'HomeController',
        controllerAs : 'home'
    })
    .state('home.modal', {
	    url: '/',
	    templateUrl: 'scripts/modals/modal.dialog.html',
	    controller : 'ModalDialogController',
	    controllerAs : 'modal'
	});

});