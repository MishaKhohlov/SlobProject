;(function(){
    'use strict';

    angular
        .module('ngAuth', ['firebase'])
        .factory('Auth', authFact);

    function authFact($firebaseAuth, $firebaseObject, $q, $log, $rootScope, firebase_url){
        // private
        var ref = new Firebase(firebase_url);
        var auth = $firebaseAuth(ref);
        function getDataPromises () {
            return $q(function(resolve, reject) {
                auth.$onAuth(function(authDataUser) {
                    $log.log('this', authDataUser);
                    // delete ! and resolve (authDataUser)
                    if(authDataUser) {
                        resolve(authDataUser)
                    } else {
                        reject("Log out")
                    }
                })
            });
        }
        var publickAuthObj = {
            getAuth: function(callback, callbackError){
                getDataPromises().then(callback, callbackError);
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
            /*getAuthUid: function(){
                // getDataPromises().then(callback, callbackError);
            },
            getAuthEmail: function(){
                // if(authData) {
                //     return "Khohlov Misha";
                //     // return authData.password.email
                // }
            },*/
            auth: function() {
                var prom = $q.defer();
                    getDataPromises().then(function(data){
                        if(data) {
                          prom.resolve();
                        } else {
                            prom.reject();
                        }
                    })
                return prom.promise
            }
        };
        return publickAuthObj;
    }
})();