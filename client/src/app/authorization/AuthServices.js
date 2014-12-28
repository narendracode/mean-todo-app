var module = angular.module('authorization.services',['ngResource']);

module.factory('IsAuthenticatedService',function($resource,$rootScope){
   
// The public API of the service
  var service = {
      init: function () {
            this.resetSession();
      },
      resetSession: function() {
            this.currentUser = null;
            this.isLoggedIn = false;
      },
      login: function(email, password,done) {
          var scope = this;
          var AuthLoginResource = $resource('/login'); 
          var authResource = new AuthLoginResource();
          authResource.email = email;
          authResource.password = password;
          authResource.$save(function(result){
              if(!(!!result['message'])){
                scope.authSuccess(result);
              }
              done(result);
          });
      },
      logout: function(done) {
            var scope = this;
          var AuthLogoutResource = $resource('/logout');
          var authLogoutResource = new AuthLogoutResource();
          authLogoutResource.$save(function(result){
                if(result['status']==200){
                     scope.resetSession();
                    $rootScope.$emit('session-changed');
                }else if(result['status']==404){
                    //do nothing..
                }
              done(result);
          });
      },
      authSuccess: function(userData) {
            this.currentUser = userData;
            this.isLoggedIn = true;
            $rootScope.$emit('session-changed');
      },
      authFailed: function() {
            this.resetSession();
      }
  }
 // service.init();
  return service;
  
});
