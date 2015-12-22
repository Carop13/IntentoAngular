angular.module('weatherApp')
.directive('caroNavBar', [function () {
	return {
		restrict: 'E',
		templateUrl: 'components/directives/nav.bar.html',
		controller : 'NavBarController'
	};
}])