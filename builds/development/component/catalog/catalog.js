;(function() {
	"use strict";

	angular.module('ngCatalog', ['ngAnimate', 'ngCookies'])
        .config(catalogConf)
        .filter('sortCatalog', sortCatalog)
        .filter('range', slaidFilter)
		.controller('catalogCtrl', catalogCtrl);
    function slaidFilter($log, Data){
        return function (input, paramObj){
            $log.log(paramObj);
            if(paramObj) {
                // paramObj.price.from && paramObj.price.to !== null
                
                // second range
                // paramObj.space.from && paramObj.space.from !==null
                $log.log(paramObj);
                var i;
                var outArr = [];
                var accessIteration;
                for(i = 0; i < input.length; i++){
                    accessIteration = true;
                    if(paramObj.price.from) {
                        $log.log(input[i].price, paramObj.price.from, input[i].price <= paramObj.price.from)
                        accessIteration = false;
                        if(input[i].price >= paramObj.price.from) {
                            $log.log('price.to true');
                            accessIteration = true;
                        }
                    }
                    if(paramObj.price.to && accessIteration) {
                        $log.log(input[i].price, paramObj.price.to, input[i].price <= paramObj.price.to)
                        accessIteration = false;
                        if(input[i].price <= paramObj.price.to) {
                            $log.log('price.from true');
                            accessIteration = true;
                        }
                    }
                    if(accessIteration) {
                        outArr.push(input[i])
                    }
                }
                Data.setlenghtCatalog(outArr.length);
                return outArr;
            } else {
                $log.log(input);
                if(input)
                Data.setlenghtCatalog(input.length);
                return input;
            }
        }
    }
    function sortCatalog($log, Data){
        return function (input, paramObj){
            // $log.log('filter');
            // $log.log(paramObj);
            if(input && paramObj) {
                var paramObjValid = Data.validData(paramObj);
                $log.log(paramObjValid);
                var collRef = 0;
                var collFirst = Object.getOwnPropertyNames(paramObjValid).length;
                var outArr = [];
                var i, coll;
                if(collFirst !== 0) {
                    for(i = 0; i < input.length; i++) {
                        coll = collFirst;
                        angular.forEach(paramObj, function(value, key) {
                            // $log.log(input[i][key] == value);
                            if(input[i][key] == value) {
                                collRef++;
                            }
                        });
                        // $log.log(collRef, coll);
                        if(collRef == coll){
                            outArr.push(input[i]);
                        }
                        collRef = 0;
                    }
                    return outArr;
                } else {
                    // $log.log('return input 2');
                    return input;
                }
            } else {
                // $log.log('return input');
                return input;
            }
        }
    }
    function catalogCtrl ($scope, $log, Data, $rootScope, $timeout) {
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
            //$scope.filter = {
            //    price: {
            //        from: null,
            //        to : null
            //    },
            //    space: {
            //        from: null,
            //        to : null
            //    }
            //};
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