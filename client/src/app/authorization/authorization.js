angular.module('authorization',['ngResource','ui.bootstrap.showErrors','angularMoment','ui.router']);

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
        $scope.login = function(){
            console.log('.... login().... is working fine..');
        }
        
           $scope.signup = function(){
               console.log('.... signup().... is working fine..');
               var authResource = new AuthSignupResource();
               authResource.email = $scope.email;
               authResource.password = $scope.password;
               authResource.$save(function(result){
                    console.log('#### result obtained::'+JSON.stringify(result));
                    $location.path("/login/")   
               });
        }
        
           
         $scope.login = function(){
               console.log('.... signup().... is working fine..');
               var authResource = new AuthLoginResource();
               authResource.email = $scope.email;
               authResource.password = $scope.password;
               authResource.$save(function(result){
                    console.log('#### result obtained::'+JSON.stringify(result));
                    $location.path("/meetup/")   
               });
        }  
    }
]);