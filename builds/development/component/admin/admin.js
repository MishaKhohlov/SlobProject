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