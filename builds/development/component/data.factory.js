;(function(){
    'use strict';

    angular
        .module('ngApp.data', ['firebase'])
        .factory('Data', dataFact);

    function dataFact($firebaseAuth, $firebaseObject, $log, $rootScope, firebase_url){
        var dataArr =  [
            {
                "id": "srcone",
                "index": 0,
                "isActive": true,
                "balance": "$3,942.81",
                "picture": "http://placehold.it/32x32",
                "age": 25,
                "eyeColor": "green",
                "name": {
                    "firstname": "Hutchinson",
                    "lastname": "Carrillo"
                }
            },
            {
                "id": "srctwo",
                "index": 1,
                "isActive": false,
                "balance": "$3,377.88",
                "picture": "http://placehold.it/32x32",
                "age": 20,
                "eyeColor": "blue",
                "name": {
                    "firstname": "Hurst",
                    "lastname": "Morales"
                }
            },
            {
                "id": "srcthree",
                "index": 2,
                "isActive": true,
                "balance": "$3,435.10",
                "picture": "http://placehold.it/32x32",
                "age": 40,
                "eyeColor": "blue",
                "name": {
                    "firstname": "Rosemarie",
                    "lastname": "Bowers"
                }
            },
            {
                "id": "srcfour",
                "index": 3,
                "isActive": true,
                "balance": "$2,063.13",
                "picture": "http://placehold.it/32x32",
                "age": 29,
                "eyeColor": "green",
                "name": {
                    "firstname": "Kelly",
                    "lastname": "Chapman"
                }
            }
        ];
        var publickDataObj = {
            getData: function(){
                return dataArr;
            },
            getDataItem: function() {
                return dataArr[$rootScope.id];
            }
    };

        return publickDataObj;
    }
})();