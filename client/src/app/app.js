angular.module('app', [
                'ngResource',
                'ui.router',
                'meetups'
                ]
);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/")
    $stateProvider
    .state('index', {
      url: "/",
      templateUrl: "app/index.tpl.html",
      controller: 'AppCtrl'
    });
}]);



angular.module('app').controller('AppCtrl', ['$scope', function($scope) {
  $scope.$on('$routeChangeError', function(event, current, previous, rejection){

  });
}]);