;(function() {
    "use strict";

    angular.module('ngDataAboutAdmin', ['ngAnimate', 'ngCookies'])
        .config(aboutAdminConf)
        .controller('aboutAdminCtrl', aboutAdminCtrl);

    function aboutAdminCtrl ($scope, $log, Data, $state, $rootScope) {
        $log.debug("List_a controller star");

        var id = $state.params.id;
        $log.log('индефикатор в строке ', id);
        Data.getDataItem(id, function(data) {
            $log.log('Загруженно одиночным запросом', data);
            $scope.item = data;
        });

        $scope.updateData = function(){
            if($scope.item.type !== 'Выберите тип объекта') {
                // переписать что бы одинаковые телефоны нельзя было добавить
                // сделать что бы форма регистрации открывалась только для нескольких человек.
                // заявки
                if( $scope.item.phone_agent[0] !== $scope.item.phone_agent[1]
                    && $scope.item.phone_agent[1] !== $scope.item.phone_agent[2]
                    && $scope.item.phone_agent[0] !== $scope.item.phone_agent[2]) {

                }
                $scope.messageAddData = null;
                Data.updateData($scope.item);
                    $scope.messageAddData = 'Данные успешно перезаписанны';
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