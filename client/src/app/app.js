angular.module('app', [
                'ngResource',
                'ngRoute',
                'meetups'
                ]
);

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo:'/'});
}]);



angular.module('app').controller('AppCtrl', ['$scope', function($scope) {
  $scope.$on('$routeChangeError', function(event, current, previous, rejection){

  });
}]);