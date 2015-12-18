angular.module('weatherApp')
.config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
        url : '/home',
        templateUrl : 'scripts/home/home.html',
        controller : 'HomeController',
        controllerAs : 'main'
    })
    .state('home.modal', {
	    url: '/modal',
	    templateUrl: 'scripts/modals/modal.dialog.html',
	    controller : 'ModalDialogController',
	    controllerAs : 'main'
	});

});