angular.module('weatherApp')
.config(function($stateProvider){

  $stateProvider.state('register',{
    url : '/register',
    templateUrl : 'components/register/register.html',
    controller: 'RegisterController',
    controllerAs : 'register'
  })
})
