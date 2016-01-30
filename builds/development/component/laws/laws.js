;(function() {
    "use strict";

    angular.module('ngLaws', [])
        .config(lawsConf);

    function lawsConf($stateProvider){
        $stateProvider
            .state('laws', {
                url: '/laws',
                templateUrl: 'component/laws/laws.html'
            })
    }
})();