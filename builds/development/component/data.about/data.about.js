;(function() {
    "use strict";

    angular.module('ngDataAbout', [])
        .config(listConf)
        .controller('listCtrl', listCtrl);

    function listCtrl ($scope, $log, Data, $state, $rootScope,  $timeout, $sessionStorage) {
        $log.debug("List controller star");
        $('body, html').stop().animate({scrollTop : 688}, 800,  'linear');
                    var id = $state.params.id;
                    var height;
                    var heightVal;
                    $log.log('индефикатор в строке ', id);
                    Data.getDataItem(id, function(data) {
                        $log.log('Загруженно одиночным запросом', data);
                        $scope.item = data;
                        $scope.titlePhotos = $scope.item.photo_object[0];
                        setTimeout(function(){
                            height = $('.objecAb_contFlext_minCont_scroll').css('height');
                            heightVal = Number(height.slice(0, height.indexOf('px'))) - 153;
                            $log.log(heightVal);
                        }, 1000);     
                    });
                    $scope.goPageCatalog = function(sort) {
                        $sessionStorage.goPage = sort;
                        $state.go('catalog');
                    };
                    $rootScope.colorChange = 'colorChange';
                    $scope.selectTitle = function(key) {
                        $scope.titlePhotos = $scope.item.photo_object[key];
                    };
                    var currentTop = 0;
                    $scope.scrollImg = function(position) {
                        
                        if(position) {
                            currentTop = currentTop - 53;
                            $log.log(Number('-' + heightVal), currentTop);
                                if(Number('-' + heightVal) < currentTop+5) {
                                    $('.objecAb_contFlext_minCont_scroll').css('top', currentTop +'px'); 
                                } else {
                                     currentTop = currentTop + 53;
                                }    
                        } else {
                            if(currentTop <0){
                                 currentTop = currentTop + 53;
                                $('.objecAb_contFlext_minCont_scroll').css('top', currentTop +'px');
                            } 
                        }
                        if(currentTop < 0) {
                            $scope.scrollUp = true;
                        } else {
                            $scope.scrollUp = false;
                        }
                    };
                    $scope.sendForm = function(obj) {
                    $log.log('data', obj);
                    Data.setRequestObj(obj);
                    $scope.send = {
                        name: null,
                        middleName: null,
                        phone: null,
                        selectForm: null,
                        discriptions: null
                    };
                    $scope.messageForForm = 'Данные отправленны, Ожидайте ответа, Спасибо';
                    $timeout(function(){
                        $scope.messageForForm = '';
                    }, 3000);
                };
        $log.debug("List controller finish");
    }

    function listConf($stateProvider){
        $stateProvider
            .state('list', {
                url: '/catalog/:id',
                templateUrl: 'component/data.about/data.about.html',
                controller: 'listCtrl'
            });
    }
})();