;(function() {
	"use strict";

	angular.module('ngCatalog', ['infinite-scroll', 'ngStorage'])
        .config(catalogConf)
        .filter('sortCatalog', sortCatalog)
        .filter('range', slaidFilter)
		.controller('catalogCtrl', catalogCtrl);
    function slaidFilter($log, Data, $rootScope){
        return function (input, paramObj){
            if(paramObj.price.from !== null || paramObj.price.to !== null || paramObj.space.from !== null || paramObj.space.to !== null && input) {
                // Запрет скрола
                $rootScope.offScroll = true;
                $log.log('no return', paramObj);
                var i;
                var outArr = [];
                var accessIteration;
                for(i = 0; i < input.length; i++) {
                    accessIteration = true;
                    if (paramObj.price.from !== null || paramObj.price.to !== null) {
                        if (paramObj.price.from) {
                            $log.log(input[i].price, paramObj.price.from, input[i].price <= paramObj.price.from);
                            accessIteration = false;
                            if (input[i].price >= paramObj.price.from) {
                                $log.log('price.to true');
                                accessIteration = true;
                            }
                        }
                        if (paramObj.price.to && accessIteration) {
                            $log.log(input[i].price, paramObj.price.to, input[i].price <= paramObj.price.to);
                            accessIteration = false;
                            if (input[i].price <= paramObj.price.to) {
                                $log.log('price.from true');
                                accessIteration = true;
                            }
                        }
                    }
                    if (paramObj.space.from !== null || paramObj.space.to !== null) {
                        if (paramObj.space.from && accessIteration) {
                            $log.log(input[i].space, paramObj.space.from, input[i].price <= paramObj.space.from);
                            accessIteration = false;
                            if (input[i].space >= paramObj.space.from) {
                                $log.log('space.from true');
                                accessIteration = true;
                            }
                        }
                        if (paramObj.space.to && accessIteration) {
                            $log.log(input[i].space, paramObj.space.to, input[i].price <= paramObj.space.to);
                            accessIteration = false;
                            if (input[i].space <= paramObj.space.to) {
                                $log.log('space.to true');
                                accessIteration = true;
                            }
                        }
                    }
                    if(accessIteration) {
                        outArr.push(input[i]);
                    }
                }
                if(input)
                Data.setlenghtCatalog(outArr.length);
                return outArr;
            } else {
                //$log.log('return input');
                if(input)
                Data.setlenghtCatalog(input.length);
                return input;
            }
        };
    }
    function sortCatalog($log, Data, $rootScope){
        return function (input, paramObj){
            if(input && paramObj) {
                // Запрет скрола
                $rootScope.offScroll = true;
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
                 //$log.log('return input');
                return input;
            }
        };
    }
    function catalogCtrl ($scope, $log, Data, $rootScope, $timeout, $sessionStorage) {
    	$log.debug("Catalog controller star");
        $rootScope.colorChange = null;
        resetFormAddObjOther();
        function resetFormAddObjOther(){
            $scope.filterRange = {
                price: {
                    from: null,
                    to : null
                },
                space: {
                    from: null,
                    to : null
                }
            };
        }
        // индекс последнего добавленного элемента
        var z = 3;
        $scope.data = [];
        // Изначально есть доступ к прокрутке
        var acceptsScroll = true;
        Data.getData(function(data){
            $log.log(data);
            $scope.dataInfinite = data;
            $scope.data.push(data[0]);
            $scope.data.push(data[1]);
            $scope.data.push(data[2]);
            if($sessionStorage.goPage) {
                $scope.filter = {
                    type: null
                };
                $rootScope.offScroll = true;
                $log.log('ses', $sessionStorage.goPage);
                $scope.filter.type = $sessionStorage.goPage;
                $sessionStorage.goPage = null;
            }
        });
        $scope.infiniteScroll = function(){
            if($scope.dataInfinite && !$rootScope.offScroll) {
                for(var i = 0; i < 3; i++) {
                    if($scope.dataInfinite[z]) {
                        $scope.data.push($scope.dataInfinite[z]);
                        $log.log('scroll');
                    }
                    z++;
                }
            }
        };
        // прослушка перменной в которую запишется значение с фильтра если там что небудь изменится
        $rootScope.$watch('offScroll', function(newValue) {
            if(newValue) {
                $scope.test = true;
                $scope.data = $scope.dataInfinite;
                $scope.clickReset = false;
            }
        });
        // Реальзован поиск одной строкой.
        $scope.$watch('searchOr', function(newValue) {
                if(!/[0-9]{4}/.test(newValue) && /[0-9]/.test(newValue)){
                    $scope.search = {
                        'number_obj' : newValue,
                        'name_obj' : undefined
                    };
                    $scope.messageForSearch = 'Поиск по номеру объекта';
                } else if(/[а-яА-я]/.test(newValue) && newValue !== undefined){
                    $scope.search = {
                        'number_obj' : undefined,
                        'name_obj' : newValue
                    };
                    $scope.messageForSearch = 'Поиск имени';
                } else if(/[0-9]{7}/.test(newValue)) {
                    $scope.search = newValue;
                    $scope.messageForSearch = 'Поиск номеру телефона';
                }
                if(newValue == '' || newValue == undefined){
                    $scope.search = {
                        'number_obj' : undefined,
                        'name_obj' : undefined
                    };
                    $scope.messageForSearch = 'Начните вводить Имя объекта или его номер';
                }
        });
        $scope.clickReset = false;
        $scope.resetFilter  =function() {
            $scope.clickReset = false;
            // сброс данных фильтра
            resetFormAddObjOther();
            // сброс данных фильтра
            $scope.filter = null;
            // возвращение переменной в нормальное положение
            $rootScope.offScroll = false;
            z = 3;
            $scope.data = [];
            $scope.data.push($scope.dataInfinite[0]);
            $scope.data.push($scope.dataInfinite[1]);
            $scope.data.push($scope.dataInfinite[2]);
            $scope.infiniteScroll();
        };


    	$log.debug("Catalog controller finish");
    }

    function catalogConf($stateProvider){
        $stateProvider
            .state('catalog', {
                    url: '/catalog',
                    templateUrl: 'component/catalog/catalog.html',
                    controller: 'catalogCtrl'
                });
    }
})();