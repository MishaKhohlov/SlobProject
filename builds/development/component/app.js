;(function() {
	"use strict";

	angular.module('ngApp', ['ui.router', 'ngAnimate', 'ngCookies', 'ngCatalog'])
        .config(slobConfig)
        .constant('firebase_url', '') 
        //.run(function(test, tw){});

    function slobConfig($stateProvider, $urlRouterProvider, $logProvider){
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'component/main/main.html'
                })
            .state('catalog', {
                url: '/catalog',
                templateUrl: 'component/catalog/catalog.html'
            })
            .state('service', {
                url: '/service',
                templateUrl: 'component/service/service.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'component/about/about.html'
            });

        $logProvider.debugEnabled(true);
    }
})();
