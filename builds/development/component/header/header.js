;(function() {
    "use strict";

    angular.module('ngHeader', ['ngAnimate'])
        .controller('headerCtrl', headerCtrl);

    function headerCtrl ($scope, $log, Data, $timeout) {
        $log.debug("Headeer controller star");
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
        $log.debug("Header controller finish");
    }
})();