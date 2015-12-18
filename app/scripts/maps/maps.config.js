angular.module('weatherApp')
	.config(function($stateProvider){
	    $stateProvider.state('maps',{
	    	url : '/maps',
	        templateUrl : 'scripts/maps/maps.html',
	        controller : 'MapsController',
	        controllerAs : 'main',
	    })
	    .state("maps.login", {
	    url: "/login",
	    onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
	        $modal.open({
	            templateUrl: "maps/login",
	            resolve: {
	              item: function() { new Item(123).get(); }
	            },
	            controller: ['$scope', 'item', function($scope, item) {
	              $scope.dismiss = function() {
	                $scope.$dismiss();
	              };

	              $scope.save = function() {
	                item.update().then(function() {
	                  $scope.$close(true);
	                });
	              };
	            }]
	        }).result.finally(function() {
	            $state.go('^');
	        });
	    }]
	});
})