angular.module('meetups',['ngResource'],['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'app/meetups/list.tpl.html',
        controller: 'MeetupsController'
    })
    .when('/create',{
        templateUrl : 'app/meetups/create.tpl.html',
        controller: 'MeetupsController'
    })
    .when('/:id',{
        templateUrl: 'app/meetups/details.tpl.html',
        controller: 'MeetupsController'
    })
    .when('/:id/edit',{
        templateUrl: 'app/meetups/edit.tpl.html',
        controller: 'MeetupsController'
    })
    .otherwise({redirectTo: '/'})
    ;
}]);

angular.module('meetups').factory('MeetupUpdateService',function($resource){
    return $resource('meetup/:id', 
    {
        id: '@id'
    },
    {
        'update': { method:'PUT' }
    },
    {
        'get': { method: 'GET', isArray: false }
    },
    {
        'delete': { method: 'DELETE'}
    }
);
});

angular.module('meetups').controller('MeetupsController',['$scope','$resource','$routeParams','$location','MeetupUpdateService',
                                                          function($scope,$resource,$routeParams,$location,MeetupUpdateService){
    var MeetupResource = $resource('/meetup/:id'); //this will be the base URL for our rest express route.
            $scope.appname = "Mean Demo";
              $scope.meetupUpdateService = new MeetupUpdateService();
            var loadMeetups = function(){
                return MeetupResource.query(function(results){
                $scope.meetups = results;
                    if($routeParams.id){
                        $scope.findMeetup($routeParams.id);
                    }
                });
            }
            
            if(!$scope.meetups)
                loadMeetups();

            $scope.createMeetup = function(){
                var createMeetupResource = new MeetupResource();
                createMeetupResource.name = $scope.meetupName;
                createMeetupResource.$save(function(result){
                    $scope.meetupName = '';
                    $scope.meetups.push(result);
                     $location.path("/")
                });
            }
               
            
            $scope.findMeetup = function(_id){
                $scope.meetupUpdateService = new MeetupUpdateService();
                $scope.meetupUpdateService.$get({id:_id},function(result){
                     $scope.meetup = result;
                }); 
            }
            
            $scope.updateMeetup = function(_id){
                $scope.meetupUpdateService = new MeetupUpdateService();
                $scope.meetupUpdateService.name = $scope.meetup.name;
                $scope.meetupUpdateService.$update({id:_id},function(result){
                    $location.path("/")
                });
            }//updateMeetup
            
            $scope.getMeetup = function(_id){
                $scope.meetupUpdateService.$get({id : _id},function(result){
                    $scope.meetup = result;
                    $location.path("/"+_id)
                });
                $scope.meetup
            }//getMeetup
            
            $scope.deleteMeetup = function(_id){
                $scope.meetupUpdateService.$delete({id: _id},function(result){
                    if(result){
                      MeetupResource.query(function(results){
                        $scope.meetups = results;
                        $location.path("/")
                      });
                    }
                });
            }//deleteMeetup
        }                                                         
]);