;(function() {
    "use strict";

    angular.module('ngHeader', ['ngAnimate'])
        .controller('headerCtrl', headerCtrl);

    function headerCtrl ($scope, $log, Data, $timeout, $state) {
        $log.debug("Headeer controller star");
        $scope.closeAddForm = function(){
            $scope.buyForm = false;
        };
        var count = 0;
        $scope.agpt = function(){
            count++;
            if(count == 3) {
                $state.go('admin');
                count = 0;
            }
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