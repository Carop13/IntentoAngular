angular.module('weatherApp')
.directive('logOutModal', [function () {
  return {
    restrict: 'E',
    templateUrl:'components/modal.logout/modal.logout.html',
    controller : 'ModalDialogController',
    controllerAs: 'modal'
  };
}])