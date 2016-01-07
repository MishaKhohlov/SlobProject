;(function() {
    "use strict";

    angular.module('ngAbout', ['ngAnimate', 'ngCookies'])
        .controller('mainCtrl', mainCtrl);

    function mainCtrl ($scope, $log, Data, $timeout) {
        $log.debug("Main controller star");
        $scope.closeAddForm = function(){
            $scope.buyForm = false;
        };
        $scope.sendForm = function(obj) {
            Data.setRequestObj(obj);
            $scope.closeAddForm();
            $scope.messageForForm = 'Данные отправленны, Ожидайте ответа, Спасибо';
            $timeout(function(){
                $scope.messageForForm = '';
            }, 3000)
        };
        $log.debug("Main controller finish");
    }
})();