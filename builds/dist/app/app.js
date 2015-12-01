;(function() {
	"use strict";

	angular.module('ngApp', ['ui.router', 'ngAnimate', 'ngCookies', 'ngCatalog',
        'ngService', 'ngAbout', 'ngApp.data', 'ngDataAbout'])
        .config(slobConfig)
        .constant('firebase_url', '') 
        //.run(function(test, tw){});

    function slobConfig($stateProvider, $urlRouterProvider, $logProvider, $locationProvider){
        $urlRouterProvider.otherwise('/home');

        /* $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
         });*/

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'component/main/main.html'
                });

        $logProvider.debugEnabled(true);
    }
})();

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
;(function() {
    "use strict";

    angular.module('ngAbout', ['ngAnimate', 'ngCookies'])
        .config(aboutConf)
        .controller('aboutCtrl', aboutCtrl);

    function aboutCtrl ($scope, $log) {
        $log.debug("About controller star");


        $log.debug("About controller finish");
    }

    function aboutConf($stateProvider){
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'component/about/about.html',
                controller: 'aboutCtrl'
            })
    }
})();
;(function() {
	"use strict";

	angular.module('ngCatalog', ['ngAnimate', 'ngCookies'])
		.config(adminConfig)
		.controller(adminCtrl);        

    function adminCtrl ($scope, $log) {
    	$log.log("Catalog controller star");


    	$log.log("Catalog controller star");
    }

     function adminConfig($stateProvider, $urlRouterProvider, $logProvider){
        $logProvider.debugEnabled(true);
    }
})();
;(function() {
	"use strict";

	angular.module('ngCatalog', ['ngAnimate', 'ngCookies'])
        .config(catalogConf)
		.controller('catalogCtrl', catalogCtrl);

    function catalogCtrl ($scope, $log, Data, $rootScope) {
    	$log.debug("Catalog controller star");
            $scope.lists = Data.getData();
            $scope.setIndex = function(index){
                $rootScope.id = index;
            };
    	$log.debug("Catalog controller finish");
    }

    function catalogConf($stateProvider){
        $stateProvider
            .state('catalog', {
                    url: '/catalog',
                    templateUrl: 'component/catalog/catalog.html',
                    controller: 'catalogCtrl'
                })
    }
})();
;(function() {
    "use strict";

    angular.module('ngDataAbout', ['ngAnimate', 'ngCookies'])
        .config(listConf)
        .controller('listCtrl', listCtrl);

    function listCtrl ($scope, $log, Data, $state, $rootScope) {
        $log.debug("List controller star");

        $scope.src = $state.params.id;
        $scope.item = Data.getDataItem();
        $log.debug("List controller finish");
    }

    function listConf($stateProvider){
        $stateProvider
            .state('list', {
                url: '/catalog/:id',
                templateUrl: 'component/data.about/data.about.html',
                controller: 'listCtrl'
            })
    }
})();
;(function() {
    "use strict";

    angular.module('ngService', ['ngAnimate', 'ngCookies'])
        .config(serviceConf)
        .controller('serviceCtrl', serviceCtrl);

    function serviceCtrl ($scope, $log) {
        $log.debug("Service controller star");


        $log.debug("Service controller finish");
    }

    function serviceConf($stateProvider){
        $stateProvider
            .state('service', {
                url: '/service',
                templateUrl: 'component/service/service.html',
                controller: 'serviceCtrl'
            })
    }
})();