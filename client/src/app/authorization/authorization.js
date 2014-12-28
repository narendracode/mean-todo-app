angular.module('authorization',['ngResource','ui.bootstrap.showErrors','validation.match','angularMoment','ui.router','authorization.services']);

angular.module('authorization').config(['$stateProvider','$urlRouterProvider',

function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");
   
     $stateProvider
     .state('login', {
      url: "/login/",
      templateUrl: 'app/authorization/login.tpl.html',
      controller: 'AuthController'
    })
    .state('signup',{
      url: "/signup/",
      templateUrl : 'app/authorization/signup.tpl.html',
      controller: 'AuthController'
    });
    
    
}
]);



angular.module('authorization').controller('AuthController',['$scope','$resource','$state','$location','IsAuthenticatedService',
    function($scope,$resource,$state,$location,IsAuthenticatedService){
        var AuthSignupResource = $resource('/signup');   
        var AuthLoginResource = $resource('/login'); 

        $scope.errorExists = false;
        
           $scope.signup = function(){
                $scope.$broadcast('show-errors-check-validity'); 
                if ($scope.singupForm.$valid){
                    var authResource = new AuthSignupResource();
                    authResource.email = $scope.email;
                    authResource.password = $scope.password;
                    authResource.$save(function(result){
                        if(result['message']){
                            $scope.errorExists = true;
                            $scope.loginErrorMessage = result['message'];
                        }else{
                         $location.path("/login/") 
                        }
                    });
                }   
          }//signup
        
           
         $scope.login = function(){
             $scope.$broadcast('show-errors-check-validity'); 
             if ($scope.loginForm.$valid){
                 IsAuthenticatedService.login($scope.email,$scope.password,function(result){
                    if(result['message']){
                        $scope.errorExists = true;
                        $scope.loginErrorMessage = result['message'];
                    }else{
                        $location.path("/meetup/") 
                    }
                 });
             }
        }//login
    }
]);