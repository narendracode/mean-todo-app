angular.module('authorization',['ngResource','ui.bootstrap.showErrors','validation.match','angularMoment','ui.router']);

angular.module('authorization').config(['$stateProvider','$urlRouterProvider',

function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");
   
    /*$stateProvider
    .state('login', {
      url: "/login/",
      templateUrl: 'app/authorization/login.tpl.html',
      controller: 'MeetupsController'
    });  */                           
}
]);



angular.module('authorization').controller('AuthController',['$scope','$resource','$state','$location',
    function($scope,$resource,$state,$location){
        var AuthSignupResource = $resource('/signup');   
        var AuthLoginResource = $resource('/login'); 

        $scope.errorExists = false;
        
           $scope.signup = function(){
                $scope.$broadcast('show-errors-check-validity'); 
               console.log('.... signup().... is working fine..');
                if ($scope.singupForm.$valid){
                    var authResource = new AuthSignupResource();
                    authResource.email = $scope.email;
                    authResource.password = $scope.password;
                    authResource.$save(function(result){
                        console.log('#### result obtained::'+JSON.stringify(result));
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
               console.log('.... login().... is working fine..');
             $scope.$broadcast('show-errors-check-validity'); 
             if ($scope.loginForm.$valid){
               var authResource = new AuthLoginResource();
               authResource.email = $scope.email;
               authResource.password = $scope.password;
               authResource.$save(function(result){
                    console.log('#### result obtained::'+JSON.stringify(result));
                    if(result['message']){
                        $scope.errorExists = true;
                        $scope.loginErrorMessage = result['message'];
                         //$location.path("/login/") 
                    }else{
                        $location.path("/meetup/") 
                    }
                     
               });
             }
        }//login
    }
]);