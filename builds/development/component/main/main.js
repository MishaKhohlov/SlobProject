;(function() {
    "use strict";

    angular.module('ngAbout', ['ngAnimate', 'ngCookies'])
        .controller('mainCtrl', mainCtrl);

    function mainCtrl ($scope, $log, Data, $timeout) {
        $log.debug("Main controller star");

        $scope.sendForm = function(obj) {
            Data.setRequestObj(obj);
            $scope.item = {
                name: null,
                middleName: null,
                phone: null,
                selectForm: null,
                discriptions: null
            };
            $scope.messageForForm = 'Данные отправленны, Ожидайте ответа, Спасибо';
            $timeout(function(){
                $scope.messageForForm = '';
            }, 3000)

        };

        // Array with name's photo's plans
        var arrPlan  = ['1r_5fl_hr', '2r_5fl_st', '3r_9fl_pl', '4r_12fl_ch', '4r_16fl_ul'];
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
                    plan: item[2],
                    inform: inform(item[0], item[1], item[2])
                };
                resultArrPlan.push(obj);
            }
        }
        function inform(room, floor, plan) {
            var result = '';
            result += room.charAt(0) + ' ком, ';
            result += floor.slice(0, floor.indexOf('f')) + ' этаж, ';
            switch (plan) {
                case 'hr':
                    result += 'Хрущёвка.';
                    break;
                case 'st':
                    result += 'Сталинка.';
                    break;
                case 'pl':
                    result += 'Полька.';
                    break;
                case 'ch':
                    result += 'Чешка.';
                    break;
                case 'ul':
                    result += 'Улучшенка.';
                    break;
            }
            return result;
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
            $log.log(resultArrPlan);
            var resultArr = [];
            var lenght = resultArrPlan.length;
            var accessIteration;
            $log.log(obj);
            for(var i = 0; i < lenght; i++) {
                accessIteration = true;
                if(obj.menuRoom) {
                    accessIteration = false;
                    if (resultArrPlan[i].room == obj.menuRoom + 'r') {
                        accessIteration = true;
                    }
                }
                if(obj.menuFloor && accessIteration) {
                    accessIteration = false;
                    if (resultArrPlan[i].floor == obj.menuFloor + 'fl') {
                        accessIteration = true;
                    }
                }
                if(obj.plan5floor && accessIteration) {
                    accessIteration = false;
                    if (resultArrPlan[i].plan == obj.plan5floor) {
                        accessIteration = true;
                    }
                }
                if(obj.planAllfloor && accessIteration) {
                    accessIteration = false;
                    if (resultArrPlan[i].plan == obj.planAllfloor) {
                        accessIteration = true;
                    }
                }
                if(accessIteration) {
                    resultArr.push(resultArrPlan[i])
                }
            }
            $scope.arrPlan = resultArr;

        }


        $log.debug("Main controller finish");
    }
})();