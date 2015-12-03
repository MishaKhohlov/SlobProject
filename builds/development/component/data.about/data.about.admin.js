;(function() {
    "use strict";

    angular.module('ngDataAboutAdmin', ['ngAnimate', 'ngCookies'])
        .config(aboutAdminConf)
        .controller('aboutAdminCtrl', aboutAdminCtrl);

    function aboutAdminCtrl ($scope, $log, Data, $state, $rootScope) {
        $log.debug("List_a controller star");

        if($rootScope.index >= 0) {
            $log.log($rootScope.index_a);
            $scope.item = Data.getDataItem($rootScope.index);
        } else {
            var state = $state.params.id;
            Data.getData().some(function (element, index) {
                if (element.number_obj == state) {
                    $scope.item = Data.getDataItem(index);
                    return true;
                }
            });
        }
        $scope.updateData = function(){
          Data.updateData($scope.item, function(){
              $log.log("Error");
          })
        };
        $log.debug("List_a controller finish");
    }

    function aboutAdminConf($stateProvider){
        $stateProvider
            .state('adminAbout', {
                url: '/catalog_admin/:id',
                templateUrl: 'component/data.about/data.about.admin.html',
                controller: 'adminCtrl',
                resolve: {
                    item: function(Auth) {
                        return Auth.auth()
                    }
                }
            })
    }
})();