;(function() {
    "use strict";

    angular.module('ngJobs', [])
        .config(jobsConf);

    function jobsConf($stateProvider){
        $stateProvider
            .state('jobs', {
                url: '/jobs',
                templateUrl: 'component/jobs/jobs.html'
            })
    }
})();