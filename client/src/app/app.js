angular.module('app', [
                'ngResource',
                'ui.router',
                'meetups',
                'authorization'
                ]
);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/")
    $stateProvider
    .state('index', {
      url: "/",
      templateUrl: "app/index.tpl.html",
      controller: 'AppCtrl'
    }).state('login', {
      url: "/login/",
      templateUrl: 'app/authorization/login.tpl.html',
      controller: 'AuthController'
    })
    .state('signup',{
      url: "/signup/",
      templateUrl : 'app/authorization/signup.tpl.html',
      controller: 'AuthController'
    });

}]);



angular.module('app').controller('AppCtrl', ['$scope', function($scope) {
  $scope.$on('$routeChangeError', function(event, current, previous, rejection){

  });
}]);


angular.module('app').controller('HeaderCtrl', ['$scope','$location', function($scope,$location) {

    $scope.meetup = function(){
        $location.path("/meetup/");
    }

}]);