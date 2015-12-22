angular.module('weatherApp')
.directive('customModal', [function () {
	return {
		restrict: 'E',
		templateUrl:'components/modals/modal.dialog.html',
		controller : 'ModalDialogController',
		controllerAs: 'modal'
	};
}])