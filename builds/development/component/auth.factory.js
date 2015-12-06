;(function(){
    'use strict';

    angular
        .module('ngAuth', ['firebase'])
        .factory('Auth', authFact);

    function authFact($firebaseAuth, $firebaseObject, $q, $log, $rootScope, firebase_url){
        var ref = new Firebase(firebase_url);
        var auth = $firebaseAuth(ref);
        auth.$onAuth(function(authData) {
            if (authData) {
                $rootScope.authLogin = true;
                $log.log("Logged in as:", authData.uid);
            } else {
                $rootScope.authLogin = false;
                $log.log("Logged out");
            }
        });
        var publickAuthObj = {
            ngAuthObj: function(authObj){
                return ref.getAuth();
            },
            login: function(userObj){
              return auth.$authWithPassword(userObj);
            },
            register:function(userObj){
                return auth.$createUser(userObj);
            },
            logout: function(){
                auth.$unauth();
            },
            getAuth: function(){
                // YYYYY
                return ref.getAuth();
            },
            auth: function() {
                var prom = $q.defer();
                //доступ к администратору
                prom.resolve();

                return prom.promise
            }
        };
        $log.log(publickAuthObj.getAuth());
        $rootScope.auth_user = function(){
          return true;
        };
        return publickAuthObj;
    }
})();