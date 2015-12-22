angular.module('weatherApp').
controller('NavBarController', ['$scope', function ($scope) {
	$scope.openModal = function(){
		console.log('openModal');
		$("#myModal").modal('show');
	};
}]);