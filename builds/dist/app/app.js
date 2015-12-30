;(function() {
	"use strict";

	angular.module('ngApp', ['ui.router', 'ngAnimate', 'ngCookies', 'ngStorage', 'ngCatalog',
        'ngService', 'ngAbout', 'ngData', 'ngAuth', 'ngDataAbout', 'ngAdmin', 'ngDataAboutAdmin'])
        .config(slobConfig)
        .constant('firebase_url', 'https://ngslob.firebaseio.com/');
        //.run(function(test, tw){});

    function slobConfig($stateProvider, $urlRouterProvider, $logProvider, $locationProvider){
        $urlRouterProvider.otherwise('/home');

        /* $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
         });*/

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'component/main/main.html'
                });

        $logProvider.debugEnabled(true);
    }
})();

;(function(){
    'use strict';

    angular
        .module('ngAuth', ['firebase'])
        .factory('Auth', authFact);

    function authFact($firebaseAuth, $firebaseObject, $q, $log, $rootScope, firebase_url){
        // private
        var ref = new Firebase(firebase_url);
        var auth = $firebaseAuth(ref);
        function getDataPromises () {
            return $q(function(resolve, reject) {
                auth.$onAuth(function(authDataUser) {
                    $log.log('this', authDataUser);
                    // delete ! and resolve (authDataUser)
                    if(authDataUser) {
                        resolve(authDataUser)
                    } else {
                        reject("Log out")
                    }
                })
            });
        }
        var publickAuthObj = {
            getAuth: function(callback, callbackError){
                getDataPromises().then(callback, callbackError);
            },
            login: function(userObj){
              return auth.$authWithPassword(userObj);
            },
            register:function(userObj){
                return auth.$createUser(userObj);
            },
            logout: function(){
                auth.$unauth();
            },
            auth: function() {
                var prom = $q.defer();
                    getDataPromises().then(function(data){
                        if(data) {
                          prom.resolve();
                        } else {
                            prom.reject();
                        }
                    })
                return prom.promise
            }
        };
        return publickAuthObj;
    }
})();
;(function(){
    'use strict';

    angular
        .module('ngData', ['firebase'])
        .factory('Data', dataFact);

    function dataFact($firebaseAuth, $firebaseObject, $firebaseArray, $q, $log, $rootScope, firebase_url, Auth){
        var dataArr =  [
            {
                'type' : 'Квартира', // дом, участки, нежилая недвижимость
                'number_obj' : 123,
                'name_obj' : 'Квартира 2км',
                'photo' : ['','','','',''],
                'isolation_house' : 'Дача', // часть дома, целый дом
                'isolation_flat' : "Изолированные",
                'room' : 'Элитные', // 1,2,3,4 many, laxury
                'price': 2100,
                'city' : 'Харьков', // kharkiv prigorod
                'district' : 'Алеексеевка',
                'space' : 43,
                'phone_agent' : [675729181,2121232,37465349],
                'name_agent' : 'Karl',
                'address' : 'street artilliryiska house 2/a',
                'discriptions' : 'This is descriptions',
                'uid' : '24b2b4eb-9486-4d60-b1d7-157c031fdcf1'
            },
            {
                'type' : 'квартира', // дом, участки, нежилая недвижимость
                'number_obj' : 223,
                'name_obj' : 'Квартира 2км',
                'photo' : ['','','','',''],
                'isolation_house' : 'дача', // часть дома, целый дом
                'isolation_flat' : true,
                'room' : 'Элитные', // 1,2,3,4 many, laxury
                'price': 2100,
                'city' : 'Пригород', // kharkiv prigorod
                'district' : 'Алеексеевка',
                'space' : 43,
                'phone_agent' : [675729181,2121232,37465349],
                'name_agent' : 'Karl',
                'address' : 'street artilliryiska house 2/a',
                'discriptions' : 'This is descriptions',
                'uid' : '24b2b4eb-9486-4d60-b1d7-157c031fdcf1'
            },
            {
                'type' : 'квартира', // дом, участки, нежилая недвижимость
                'number_obj' : 332,
                'name_obj' : 'Квартира 2км',
                'photo' : ['','','','',''],
                'isolation_house' : 'дача', // часть дома, целый дом
                'isolation_flat' : true,
                'room' : 'Элитные', // 1,2,3,4 many, laxury
                'price': 2100,
                'city' : 'Пригород', // kharkiv prigorod
                'district' : 'Алеексеевка',
                'space' : 43,
                'phone_agent' : [675729181,2121232,37465349],
                'name_agent' : 'Misha',
                'address' : 'street artilliryiska house 2/a',
                'discriptions' : 'This is descriptions',
                'uid' : '24b2b4eb-9486-4d60-b1d7-157c031fdcf1'
            },
            {
                'type' : 'квартира', // дом, участки, нежилая недвижимость
                'number_obj' : 432,
                'name_obj' : 'Квартира 2км',
                'photo' : ['','','','',''],
                'isolation_house' : 'дача', // часть дома, целый дом
                'isolation_flat' : true,
                'room' : 'Элитные', // 1,2,3,4 many, laxury
                'price': 2100,
                'city' : 'Харьков', // kharkiv prigorod
                'district' : 'Алеексеевка',
                'space' : 43,
                'phone_agent' : [675729181,2121232,37465349],
                'name_agent' : 'Misha',
                'address' : 'street artilliryiska house 2/a',
                'discriptions' : 'This is descriptions',
                'uid' : '44dfc8ac-1c15-4332-aee6-306d066f60bd'
            }
        ];

        var ref = new Firebase(firebase_url);
        var usersRef = ref.child('user');
        var objRef = ref.child('object');
        var dataObj = $firebaseArray(objRef);

        function loaded(child){
                var usersRef = ref.child('user').child(child);
                var userObj = $firebaseObject(usersRef);
            return userObj;
        }
        // Дописать цикл перебора срванения
        //function arrValid(){
        //    var arr = [123, 321, 456, 786, 321];
        //    for (){}
        //}
        function loadedObj(child){
            var dataRef = ref.child('object').child(child);
            var dataObj = $firebaseObject(dataRef);
            return dataObj;
        }
        var publickDataObj = {
            // Валидация данных на пустные поле и на отсуутсвия полей которые не нужны для данного типа объекта
            validData: function(obj) {
                for (var key in obj) {
                    if(obj[key] == 'Свойства объекта' || obj[key] == 'Кол-во комнат' || obj[key] == 'Местоположение' || obj[key] == 'Район') {
                        delete obj[key]
                    }
                }
                if(obj.city) {
                    delete obj.district;
                }
                if(obj.type == 'Дом') {
                    delete obj.isolation_flat;
                } else if(obj.type == 'Квартира') {
                    delete obj.isolation_house;
                }  else {
                    delete obj.isolation_flat;
                    delete obj.isolation_house;
                    delete obj.room;
                }
                return obj;
            },
            // Проверка что бы в массиве не было одинаковых значений
            validArr: function(arr){
                var index = 0;
                var result = true;
                arr.forEach(function(inter){
                    var perem = inter;
                      for (var i = 0; i < arr.length; i++) {
                          if(i !== index) {
                              if(perem == arr[i]) {
                                  result = false;
                              }
                          }
                      }
                    index++;
                });
                return result;
            },
            // Загрузка пользователя
            getDataUser: function(uid, callback){
                loaded(uid).$loaded().then(callback, function(error) {
                    console.log("Error dowload  user(1)", error);
                });
            },
            // Загрузка данных
            getData: function(callback){
                dataObj.$loaded().then(callback, function(error) {
                    console.log("Error dowload  data obj ", error);
                });
            },
            // Загрузка одного объекта по запросуу
            getDataItem: function(id, callback) {
                loadedObj(id).$loaded().then(callback, function(error) {
                    console.log("Error dowload data obj(1)", error);
                });
            },
            // добавление имени файла картинки в базу объекта
            addImageItem: function(arrImage, id) {
                objRef.child(id).update({"photo_object" : arrImage}, function(error) {
                    if (error) {
                        $log.log("Data could not be saved(Image object)." + error);
                    } else {
                        $log.log("Data saved successfully(Image object).");
                    }
                });
            },
            deleteImageItem: function(newArray, id){
                $log.log('Delete Photo 2', newArray, id);
                objRef.child(id).child("photo_object").set(newArray);
            },
            deleteObjItem: function(id){
                objRef.child(id).set(null);
            },
            // Добавление Агента
            setDataUser: function (objUser, uid) {
                var cloneObj = {};
                for(var key in objUser)
                    cloneObj[key] = objUser[key];
                delete cloneObj.password;
                cloneObj.uid = uid;
                $log.log(cloneObj);
                usersRef.child(cloneObj.uid).set(cloneObj);
            },
            // Добавление объекта недвижимости
            setDataObj : function(obj){
                objRef.child(obj.number_obj).set(obj);
            },
            // Изменение объекта недвижимости
            updateData: function(obj){
                var obj = publickDataObj.validData(obj);
                $log.log(obj);
                var cloneObj = {};
                for(var key in obj) {

                    if(key == 'address' || key == 'city' || key == 'discriptions' || key == 'district'
                     || key == 'isolation_house' || key == 'isolation_flat' || key == 'name_agent' || key == 'name_obj' || key == 'number_obj' || key == 'phone_agent'
                     || key == 'price' || key == 'room' || key == 'space' || 
                     key == 'type' || key == 'uid') {
                        cloneObj[key] = obj[key];
                    }
                  }
                $log.log(cloneObj);
                objRef.child(obj.number_obj).update(cloneObj);
            }
    };

        return publickDataObj;
    }
})();

                // Можно думать о загрузке картинок на сервер
                // Работать над фильтрами
                // Форма заявки
;(function() {
    "use strict";

    angular.module('ngAbout', ['ngAnimate', 'ngCookies'])
        .config(aboutConf)
        .controller('aboutCtrl', aboutCtrl);

    function aboutCtrl ($scope, $log) {
        $log.debug("About controller star");


        $log.debug("About controller finish");
    }

    function aboutConf($stateProvider){
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'component/about/about.html',
                controller: 'aboutCtrl'
            })
    }
})();
;(function() {
	"use strict";

	angular.module('ngAdmin', ['ngAnimate', 'ngCookies'])
		.config(adminConfig)
		.filter('userAccept', function() {
			return function(inputData, params, admin) {
					var result = [];
					if (params && !admin) {
						angular.forEach(inputData, function(value, key) {
							if(value.uid == params) {
								result.push(value);
							}
						});
						return result;
					} else {
						return inputData;
					}

			};
		})
		.controller('adminCtrl', adminCtrl);

    function adminCtrl ($timeout, $state, $scope, $log, $rootScope, $localStorage, Auth, Data) {
    	$log.log("Admin controller star");
		resetFormAddObjOther();
		$scope.setAgent = false;
		//$scope.setAgent = '44dfc8ac-1c15-4332-aee6-306d066f60bd';
		// Заготовки объектов
		$scope.userLogin = {
			email: null,
			password: null
		};
		$scope.userCredentials = {
			email: null,
			password: null,
			firstname: null,
			lastname: null,
			admin: false
		};
		function resetFormAddObjOther(){
			$scope.item = {
				type : 'Выберите тип объекта',
				isolation_house : 'Свойства объекта',
				isolation_flat : 'Свойства объекта',
				room : 'Кол-во комнат',
				city: 'Местоположение',
				district : 'Район'

			};
		}
		function resetFormAddObj(obj) {
			for (var key in obj) {
				obj[key] = null;
			}
			resetFormAddObjOther();
		}
		// очистка классов формы для регистрации
		function resetForm() {
			$scope.emptyDataEmail = false;
			$scope.emptyDataPassword = false;
			$scope.emptyDataFirstName = false;
			$scope.emptyDataLastName = false;
		}
		// очистка классов формы для логина
		function  resetFormLogin() {
			$scope.emptyDataEmailUser = false;
			$scope.emptyDataPasswordUser = false;
		}
		// валидация на пустые поля формы регистрации
		function emptyParams(obj){
			var params = '';
			resetForm();
			angular.forEach(obj, function(value, key) {
				if(value == null || value == "") {
					if(key !== "admin") {
						switch (key) {
							case 'email':
								$scope.emptyDataEmail = true;
								params += "Email; ";
								break
							case 'password':
								$scope.emptyDataPassword = true;
								params += "Пароль; ";
								break
							case 'firstname':
								$scope.emptyDataFirstName = true;
								params += "Имя; ";
								break
							case 'lastname':
								$scope.emptyDataLastName = true;
								params += "Фамилию; ";
								break
						}
					}
				}
			});
			return params;
		}
		// валидация на пустые поля формы логина
		function emptyParamsLogin(obj){
			var params = '';
			resetFormLogin();
			angular.forEach(obj, function(value, key) {
				if(value == null || value == "") {
						switch (key) {
							case 'email':
								$scope.emptyDataEmailUser = true;
								params += "Email; ";
								break
							case 'password':
								$scope.emptyDataPasswordUser = true;
								params += "Пароль; ";
								break
						}
				}
			});
			return params;
		}
		// очистка объектов
		function clearAuthObj(){
			$scope.userLogin = {
				email: null,
				password: null
			};
			$scope.userCredentials = {
				email: null,
				password: null,
				firstname: null,
				lastname: null,
				admin: false,
				uid: null
			};
		}




		//$scope.$storage = $localStorage;
		//$storage.counter = 1;
		//$log.log($storage.counter);

		//$scope.counter = 42;
		//$localStorage.counter = $scope.counter;
		//$log.log($localStorage.counter);

		// получеиие данных пользователя
		Auth.getAuth(function(data) {
			$log.log("Значение которое возвращает запрос на одного пользователя ", data);
				$scope.authLogin = function(){
					return data;
				};
					// повторить с sessionStorage.
					$scope.setAgent = data.uid;
					$localStorage.setAgent = data.uid;

					Data.getDataUser(data.uid, function (data) {
						$scope.userData = data;
						$scope.adminComplete = data.admin;
						$localStorage.adminComplete = data.admin;
						if(data.admin) {
							$scope.admin = 'Добро пожаловать, Вы наделенны полномочиями администратора';
						}
					})
		});
		// Вход
		$scope.login = function(){
			if(!emptyParamsLogin($scope.userLogin)){
				$scope.messageLogin = '';
				Auth.login($scope.userLogin).then(function(userData) {
					$scope.messageLogin = "Вход выполнен" + userData.password.email;
					$log.log(userData);
					clearAuthObj();
					$state.reload();
				}).catch(function(error) {
					$scope.messageLogin =  "Произошла ошибка сообщите администратору " + error;
				});
			} else {
				$scope.messageLogin = "Заполните" + emptyParamsLogin($scope.userLogin);
			}
		};	

		// Регистрация
		$scope.register = function(){
			if(!emptyParams($scope.userCredentials)) {
				$log.log("Data accept");
				$scope.messageForUser = '';
				// Data.setDataUser($scope.userCredentials, 32376423);
				Auth.register($scope.userCredentials).then(function (userData) {
					$scope.messageForUser = "Пользователь зарегистрирован как " + $scope.userCredentials.email
							+ $scope.userCredentials.password + $scope.userCredentials.admin;
							// userData.uid
							$log.log($scope.userCredentials, userData.uid);
					Data.setDataUser($scope.userCredentials, userData.uid);
					clearAuthObj();
				}).catch(function (error) {
					$scope.messageForUser = "Произошла ошибка сообщите администратору " + error;
				});
			} else {
				$scope.messageForUser = "Заполните " + emptyParams($scope.userCredentials);
			}
		};
		$scope.logout = function(){
			$state.reload();
			Auth.logout();
			$rootScope.setAgent = null;
			$scope.admin = null;
			delete $localStorage.setAgent;
			delete $localStorage.adminComplete;
		};
		// получение данных
		Data.getData(function(data){
			$scope.data = data;
		});
		// рандомные числа
		function randomInteger(min, max) {
			var rand = min + Math.random() * (max + 1 - min);
			rand = Math.floor(rand);
			return rand;
		}
    	$scope.addNewObject = function(obj) {
			if(obj.type !== 'Выберите тип объекта') {
				var objForArr = [];
				angular.forEach($scope.item.phone_agent, function(value, key) {
					this.push(value);
				}, objForArr);
				if(Data.validArr(objForArr)) {
					var objVal = Data.validData(obj);
					objVal.number_obj = randomInteger(0, 500);
					objVal.name_agent = $scope.userData.lastname + " " + $scope.userData.firstname;
					objVal.uid = $scope.setAgent;
					Data.setDataObj(objVal);
					$log.log(objVal);
					resetFormAddObj(objVal);
					$scope.messageAddData = null;
					$scope.addForm = false;
				} else {
					$scope.messageAddData = 'Вы ввели одинаковые телефон';
				}
			} else {
				$scope.messageAddData = 'Укажите тип объекта';
			}
    	};
		$scope.deleteObj = function(id){
			Data.deleteObjItem(id);
			$log.log("Объект " + id +" Удалён");
		};
		$log.log("Admin controller finish");
    }

     function adminConfig($stateProvider){
		 $stateProvider
				 .state('admin', {
					 url: '/admin',
					 templateUrl: 'component/admin/admin.html',
					 controller: 'adminCtrl'
				 })
    }
})();
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
    function aboutAdminCtrl ($scope, $rootScope, $localStorage, $log, $state, Auth, Data) {
        $log.debug("List_a controller star");
        var id = $state.params.id;

        // Удаление файлов фотографий основной информации
        $scope.deletePhoto = function(idFile){
            //delete $rootScope.arrImageName[idFile];
            $rootScope.arrImageName.splice(idFile, 1);
            Data.deleteImageItem($rootScope.arrImageName, id);
        };
        $scope.deleteObj = function(id){
            Data.deleteObjItem(id);
            $log.log("Объект " + id +" Удалён");
            $state.go('admin');
        };
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

        $scope.updateData = function(){
            if($scope.item.type !== 'Выберите тип объекта') {
                $log.log($scope.item.phone_agent)
                if(Data.validArr($scope.item.phone_agent)) {
                    $scope.messageAddData = null;
                    Data.updateData($scope.item);
                    $scope.messageAddData = 'Данные успешно перезаписанны';
                } else {
                    $scope.messageAddData = 'Вы ввели одинаковые телефон';
                }
            } else {
                    $scope.messageAddData = 'Укажите тип объекта';
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
;(function() {
    "use strict";

    angular.module('ngDataAbout', ['ngAnimate', 'ngCookies'])
        .config(listConf)
        .controller('listCtrl', listCtrl);

    function listCtrl ($scope, $log, Data, $state, $rootScope) {
        $log.debug("List controller star");
                    var id = $state.params.id;
                    $log.log('индефикатор в строке ', id);
                    Data.getDataItem(id, function(data) {
                        $log.log('Загруженно одиночным запросом', data);
                        $scope.item = data;
                    });
        $log.debug("List controller finish");
    }

    function listConf($stateProvider){
        $stateProvider
            .state('list', {
                url: '/catalog/:id',
                templateUrl: 'component/data.about/data.about.html',
                controller: 'listCtrl'
            })
    }
})();
;(function() {
    "use strict";

    angular.module('ngService', ['ngAnimate', 'ngCookies'])
        .config(serviceConf)
        .controller('serviceCtrl', serviceCtrl);

    function serviceCtrl ($scope, $log) {
        $log.debug("Service controller star");


        $log.debug("Service controller finish");
    }

    function serviceConf($stateProvider){
        $stateProvider
            .state('service', {
                url: '/service',
                templateUrl: 'component/service/service.html',
                controller: 'serviceCtrl'
            })
    }
})();