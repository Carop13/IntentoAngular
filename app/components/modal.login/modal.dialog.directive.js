angular.module('weatherApp')
.directive('customModal', [function () {
  return {
    restrict: 'E',
    templateUrl:'components/modal.login/modal.dialog.html',
    controller : 'ModalDialogController',
    controllerAs: 'modal'
  };
}])
