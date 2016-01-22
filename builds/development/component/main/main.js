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

        // Array with name's photo's plans
        var arrPlan  = ['1r_5fl_hr', '2r_9fl_hr', '3r_5fl_hr', '4r_5fl_hr', '5r_5fl_hr'];
        var resultArrPlan = [];
        parse(arrPlan);
        $scope.arrPlan = resultArrPlan;
        function parse(arr) {
            for(var val in arr) {
               var item = arr[val].split('_');
                var obj ={
                    name: arr[val],
                    room: item[0],
                    floor: item[1],
                    plan: item[2]
                };
                resultArrPlan.push(obj);
            }
        }
        $log.log(resultArrPlan);
        $scope.$watchCollection('select', function(newValue, oldValue) {
            if(newValue.menuFloor && newValue.menuFloor == 5) {
                $scope.select.planAllfloor = false;
            } else {
                $scope.select.plan5floor = false;
            }
             select(newValue, oldValue);
        });
        function resetForm() {
            $scope.select = {
                menuRoom : false,
                menuFloor : false,
                plan5floor : false,
                planAllFloor: false
            };
        }
        resetForm();
        $scope.resetForm = function(form) {
            $log.log(form);
            if(form == 1) {
                resetForm();
            } else if(form == 2) {
                $scope.select.menuFloor = false;
                $scope.select.plan5floor = false;
                $scope.select.planAllfloor = false;
            }  else  {
                $scope.select.plan5floor = false;
                $scope.select.planAllfloor = false;
            }

        };
        function select(obj, oldObj) {
            // $scope.arrPlan
        }


        $log.debug("Main controller finish");
    }
})();