angular.module('app', [
                'ngResource',
                'ui.router',
                'meetups',
                'authorization',
                'authorization.services'
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


angular.module('app').controller('HeaderCtrl', ['$scope','$location','IsAuthenticatedService', function($scope,$location,IsAuthenticatedService) {

    $scope.meetup = function(){
        $location.path("/meetup/");
    }
    
    $scope.isAuthenticated = function(){
        console.log("  ##### isAuthenticated is called :"+IsAuthenticatedService.isLoggedIn);
        return IsAuthenticatedService.isLoggedIn;
    }
    
    $scope.isNotLoggedIn = function(){
        return !IsAuthenticatedService.isLoggedIn;
    }
    
    $scope.logout = function(){
        IsAuthenticatedService.logout(function(result){
            console.log('#### result of log out :'+JSON.stringify(result));
            if(result['status']==200){
                $location.path("/login/");
            }
        });
    }
    

}]);