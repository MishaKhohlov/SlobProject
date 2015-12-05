;(function(){
    'use strict';

    angular
        .module('ngAuth', ['firebase'])
        .factory('Auth', authFact);

    function authFact($firebaseAuth, $firebaseObject, $q, $log, $rootScope, firebase_url){
        var ref = new Firebase(firebase_url);
        var auth = $firebaseAuth(ref);
        var publickAuthObj = {
            login:function(userObj){
                return auth.$createUser(userObj);
            },
            auth: function() {
                var prom = $q.defer();
                //доступ к администратору
                prom.resolve();

                return prom.promise
            }
        };
        $rootScope.auth_user = function(){
          return true;
        };
        return publickAuthObj;
    }
})();