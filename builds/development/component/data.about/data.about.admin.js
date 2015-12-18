;(function() {
    "use strict";

    angular.module('ngDataAboutAdmin', ['ngAnimate', 'ngCookies'])
        .config(aboutAdminConf)
        .controller('aboutAdminCtrl', aboutAdminCtrl);

    function aboutAdminCtrl ($scope, $rootScope, $log, $state, Auth, Data) {
        $log.debug("List_a controller star");
        var id = $state.params.id;
        
        Data.getDataItem(id, function(data) {

            // повторить с sessionStorage.
            // sessionStorage == data.uid
            if(data.uid) {
                $scope.messageClosePageAbout = null;
                $scope.closeDataAbout = false;
                $log.log('Загруженно одиночным запросом', data);
                $scope.item = data;
            } else {
              $scope.messageClosePageAbout = 'Вы пытаетесь зайти на запрещёную страницу';
              $scope.closeDataAbout = true;
            }
        });

        $scope.updateData = function(){
            if($scope.item.type !== 'Выберите тип объекта') {
                if(Data.validArr($scope.item.phone_agent)) {
                    Data.validArr($scope.item.phone_agent);
                    $scope.messageAddData = null;
                    Data.updateData($scope.item);
                    $scope.messageAddData = 'Данные успешно перезаписанны';
                } else {
                    $scope.messageAddData = 'Вы ввели одинаковые телефон';
                }
            } else {
                    $scope.messageAddData = 'Укажите тип объекта';
            }
        };
        $log.debug("List_a controller finish");
    }

    function aboutAdminConf($stateProvider){
        $stateProvider
            .state('adminAbout', {
                url: '/catalog_admin/:id',
                templateUrl: 'component/data.about/data.about.admin.html',
                controller: 'aboutAdminCtrl',
                resolve: {
                     item: function(Auth) {
                        return Auth.auth();
                     }
                }
            })
    }
})();