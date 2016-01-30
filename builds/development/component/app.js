;(function() {
	"use strict";

	angular.module('ngApp', ['ui.router', 'ngAnimate', 'ngStorage', 'ngMain', 'ngCatalog',
        'ngAbout', 'ngHeader',  'ngService', 'ngJobs', 'ngLaws', 'ngData', 'infinite-scroll', 'ngAuth', 'ngDataAbout', 'ngAdmin', 'ngDataAboutAdmin'])
        .config(slobConfig)
        .constant('firebase_url', 'https://ngslob.firebaseio.com/');
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
