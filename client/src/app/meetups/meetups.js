angular.module('meetups',['ngResource','ui.bootstrap.showErrors'],['$routeProvider',function($routeProvider){
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

angular.module('meetups').factory('socket',function(){
    var socket = io.connect("http://192.168.0.13:3000");
    return socket;
});

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

angular.module('meetups').controller('MeetupsController',['$scope','$resource','$routeParams','$location','MeetupUpdateService','socket',
                                                          function($scope,$resource,$routeParams,$location,MeetupUpdateService,socket){
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
            
            socket.on('new meetup',function(data){
                loadMeetups();
            });
            
            socket.on('edit meetup',function(data){
                loadMeetups();
            });
                
            socket.on('delete meetup',function(data){
                loadMeetups();
            });
                                                              
            
            if(!$scope.meetups)
                loadMeetups();

            $scope.createMeetup = function(){
                $scope.$broadcast('show-errors-check-validity'); 
                //broadcast the errors for all the fields which are required to be valid
                if ($scope.meetupCreateForm.$valid){ 
                    var createMeetupResource = new MeetupResource();
                    createMeetupResource.name = $scope.meetupName;
                    createMeetupResource.$save(function(result){
                        $scope.meetupName = '';
                        socket.emit('meetup added',result);
                        $scope.meetups.push(result);
                        $location.path("/")
                    });
                }
            }//createMeetup()
            
            $scope.reset = function(){
                $scope.$broadcast('show-errors-reset');
                $scope.meetupName = "";
                $scope.meetupDate = "";
                $scope.meetupFromTime = "";
                $scope.meetupToTime = "";
                $scope.meetupVenue = "";
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
                        socket.emit('meetup updated',result);
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
                     socket.emit('meetup deleted',result);
                    $location.path("/")
                    /*  MeetupResource.query(function(results){
                        $scope.meetups = results;
                        $location.path("/")
                      }); */
                });
            }//deleteMeetup
        }                                                         
]);