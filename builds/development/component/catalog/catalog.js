;(function() {
	"use strict";

	angular.module('ngCatalog', ['ngAnimate', 'ngCookies'])
        .config(catalogConf)
		.controller('catalogCtrl', catalogCtrl);

    function catalogCtrl ($scope, $log, Data, $rootScope) {
    	$log.debug("Catalog controller star");
            Data.getData(function(data){
                $scope.data = data;
            });
        // Реальзован поиск одной строкой.
        $scope.$watch('searchOr', function(newValue) {
                if(!/[^[0-9]/.test(newValue)){
                    $scope.search = {
                        'number_obj' : newValue,
                        'name_obj' : ''
                    };
                    $scope.messageForSearch = 'Поиск по номеру объекта';
                } else if(/[^[0-9]/.test(newValue) && newValue !== undefined){
                    $scope.search = {
                        'number_obj' : '',
                        'name_obj' : newValue
                    };
                    $scope.messageForSearch = 'Поиск имени';
                }

                if(newValue == '' || newValue == undefined){
                    $scope.search = {
                        'number_obj' : '',
                        'name_obj' : ''
                    };
                    $scope.messageForSearch = 'Начните вводить Имя объекта или его номер';
                }
        });
        resetFormAddObjOther();
        function resetFormAddObjOther(){
            $scope.filter = {
                price: {
                    from: 0,
                    to : null
                },
                space: {
                    from: 0,
                    to : null
                }
            };
        }
    	$log.debug("Catalog controller finish");
    }

    function catalogConf($stateProvider){
        $stateProvider
            .state('catalog', {
                    url: '/catalog',
                    templateUrl: 'component/catalog/catalog.html',
                    controller: 'catalogCtrl'
                })
    }
})();