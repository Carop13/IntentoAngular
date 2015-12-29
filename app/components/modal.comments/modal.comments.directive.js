angular.module('weatherApp')
.directive('commentsModal', [function () {
  return {
    restrict: 'E',
    templateUrl:'components/modal.comments/modal.comments.html'
  };
}])