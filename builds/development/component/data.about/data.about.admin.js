;(function() {
    "use strict";

    angular.module('ngDataAboutAdmin', ['ngAnimate', 'ngCookies', 'angularFileUpload'])
        .config(aboutAdminConf)
        .directive('ngThumb', ['$window', function($window) {
            var helper = {
                support: !!($window.FileReader && $window.CanvasRenderingContext2D),
                isFile: function(item) {
                    return angular.isObject(item) && item instanceof $window.File;
                },
                isImage: function(file) {
                    var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            };

            return {
                restrict: 'A',
                template: '<canvas/>',
                link: function(scope, element, attributes) {
                    if (!helper.support) return;

                    var params = scope.$eval(attributes.ngThumb);

                    if (!helper.isFile(params.file)) return;
                    if (!helper.isImage(params.file)) return;

                    var canvas = element.find('canvas');
                    var reader = new FileReader();

                    reader.onload = onLoadFile;
                    reader.readAsDataURL(params.file);

                    function onLoadFile(event) {
                        var img = new Image();
                        img.onload = onLoadImage;
                        img.src = event.target.result;
                    }

                    function onLoadImage() {
                        var width = params.width || this.width / this.height * params.height;
                        var height = params.height || this.height / this.width * params.width;
                        canvas.attr({ width: width, height: height });
                        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                    }
                }
            };
        }])
        .controller('AppController', appController )
        .controller('aboutAdminCtrl', aboutAdminCtrl);

    function appController($scope, $log, FileUploader, Data, $state, $rootScope, $timeout){
        var id = $state.params.id;
        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|JPG|jpeg|'.indexOf(type) !== -1;
            }
        });

        $scope.messageImg = [];
        var indexMessage = 1;
        // пока пустой массив в который потом добавятся имена файлов
        $rootScope.arrImageName = [];
        // test
        //$timeout(function(){
        //    $log.log($rootScope.arrImageName);
        //}, 4000);

        // добавление имёна файлов в массив
        function addNamePhoto () {
            if($rootScope.arrImageName[0]) {
                Data.addImageItem($rootScope.arrImageName, id);
            } else {
                $log.log("arrImageName empty")
            }
        }
        // CALLBACKS
        function messageForClient(message){
            $scope.messageImg.push(indexMessage + ' - ' + message);
            indexMessage++;
        }
        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
            messageForClient('Произошла ошибка');
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            messageForClient('Файл добавлен');
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
            messageForClient('Загрузка Началась');
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            messageForClient('Загрузка файла началась');
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
            messageForClient('Произошла ошибка загрузки одного файла обратитесь к Администратору');
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            $log.log(fileItem.file.name);
            $rootScope.arrImageName.push(fileItem.file.name);
            messageForClient('Файл загружен');
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
            messageForClient('Все файлы загружены');
            addNamePhoto ();
            $state.reload();
        };

        console.info('Общая информация', uploader);


        // -------------------------------


        var controller = $scope.controller = {
            isImage: function(item) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

    }
    function aboutAdminCtrl ($scope, $rootScope, $timeout, $localStorage, $log, $state, Auth, Data) {
        $log.debug("List_a controller star");
        var id = $state.params.id;
        function valueEmpty(){
            $scope.item = {
                type : '',
                name_obj: '',
                city: '',
                isolation_house: '',
                isolation_flat: '',
                discriptions : '',
                phone_agent : [],
                photo_object : [],
                price : null,
                room : null,
                space : null

            };
        }
        valueEmpty();
        // Удаление файлов фотографий основной информации
        $scope.deletePhoto = function(idFile){
            //delete $rootScope.arrImageName[idFile];
            $rootScope.arrImageName.splice(idFile, 1);
            Data.deleteImageItem($rootScope.arrImageName, id);
        };
        // Удаление объекта
        $scope.deleteObj = function(id){
            Data.deleteObjItem(id);
            $log.log("Объект " + id +" Удалён");
            $state.go('admin');
        };
        // Получение объекта с данными на эту страницу
        Data.getDataItem(id, function(data) {
            if($localStorage.setAgent == data.uid || $localStorage.adminComplete) {
                $scope.messageClosePageAbout = null;
                $scope.closeDataAbout = false;
                $log.log('Загруженно одиночным запросом', data);
                $scope.item = data;
                if(data.photo_object) {
                    $log.log("promises array", data.photo_object);
                    $rootScope.arrImageName = data.photo_object;
                }
            } else {
              $scope.messageClosePageAbout = 'Вы пытаетесь зайти на запрещёную страницу';
              $scope.closeDataAbout = true;
            }
        });
        // Обновление данных
        $scope.updateData = function(){
            $log.log($scope.item.price);
            if($scope.item.type !== '' && $scope.item.price) {
                $scope.emptyData = false;
                var objForArr = [];
                angular.forEach($scope.item.phone_agent, function(value) {
                    this.push(value);
                }, objForArr);
                $log.log(objForArr);
                if(Data.validArr(objForArr)) {
                    $scope.messageAddData = null;
                    Data.updateData($scope.item);
                    $scope.messageAddData = 'Данные успешно перезаписанны';
                } else {
                    $scope.messageAddData = 'Вы ввели одинаковые телефон';
                }
            } else {
                    $scope.emptyData = true;
                    $scope.messageAddData = 'Заполните обязательные поля';
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