angular.module('angular-client-side-auth', [
                                            'ngCookies',
                                            'ngRoute'
                                           ]
);

angular.module('angular-client-side-auth').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

     $routeProvider
     .when('/',{
         
        templateUrl: 'app/index.tpl.html',
        controller: 'AppCtrl'
    });
    
    
}]);