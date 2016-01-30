;(function() {
    "use strict";

    angular.module('ngService', [])
        .config(serviceConf);

    function serviceConf($stateProvider){
        $stateProvider
            .state('service', {
                url: '/service',
                templateUrl: 'component/service/service.html'
            })
    }
})();