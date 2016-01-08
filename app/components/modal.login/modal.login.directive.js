angular.module('weatherApp')
.directive('customModal', [function () {
  return {
    restrict: 'E',
    templateUrl:'components/modal.login/modal.login.html',
    controller : 'ModalLoginController',
    controllerAs: 'modalLogin'
  };
}])
