;(function() {
    "use strict";

    angular.module('ngAbout', [])
        .config(aboutConf)
        .controller('aboutCtrl', aboutCtrl);

    function aboutCtrl ($scope, $log, $rootScope) {
        $log.debug("About controller star");
        $rootScope.colorChange = null;

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