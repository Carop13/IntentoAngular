angular.module('weatherApp')
.config(function($stateProvider, $urlRouterProvider){
    
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('home', {
    url : '/',
    templateUrl : 'components/home/home.html',
    controller : 'HomeController',
    controllerAs : 'home'
  });
  // .state('modal', {
  //   url: '/',
  //   templateUrl: 'components/modals/modal.dialog.html',
  //   controller : 'ModalDialogController',
  //   controllerAs : 'modal'
  // });

});