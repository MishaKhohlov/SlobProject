;(function(){
    'use strict';

    angular
        .module('ngAuth', ['firebase'])
        .factory('Auth', authFact);

    function authFact($firebaseAuth, $firebaseObject, $q, $log, $rootScope, firebase_url){
        // private
        var ref = new Firebase(firebase_url);
        var auth = $firebaseAuth(ref);

        var authData = {};
        auth.$onAuth(function(authDataUser) {
            if(authDataUser) {
                $log.log("Login", authDataUser)
            } else {
                $log.log("Log out")
            }
            authData = authDataUser;
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
            // Добавить обещания
            getAuth: function(){
                if(authData) {
                    return authData
                }
            },
            getAuthUid: function(){
                if(authData) {
                    return authData.uid
                }
            },
            getAuthEmail: function(){
                if(authData) {
                    return "Khohlov Misha";
                    // return authData.password.email
                }
            },
            auth: function() {
                var prom = $q.defer();
                if(authData) {
                   prom.resolve();
                } else {
                    prom.reject();
                }
                return prom.promise
            }
        };
        return publickAuthObj;
    }
})();