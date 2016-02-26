;(function() {
	"use strict";

	angular.module('ngAdmin', ['ngAnimate'])
		.config(adminConfig)
		.filter('userAccept', function() {
			return function(inputData, params, admin) {
					var result = [];
					if (params && !admin) {
						angular.forEach(inputData, function(value) {
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
		.controller('AppControllerAdmin', appControllerAdmin )
		.controller('adminCtrl', adminCtrl);

	function appControllerAdmin($scope, $log, FileUploader, Data, $state, $rootScope, $timeout){
		$log.log("Image controller star");
		$rootScope.colorChange = null;
		var id;
		$rootScope.$watch('newId', function(newValue) {
			id = newValue;
		});
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
		$scope.arrImageName = [];
		$rootScope.tryButton  = false;
		var indexMessage = 1;

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
			$scope.arrImageName.push(fileItem.file.name);
			messageForClient('Файл загружен');
		};
		uploader.onCompleteAll = function() {
			console.info('onCompleteAll');
			messageForClient('Все файлы загружены');
			$rootScope.imageArray = $scope.arrImageName;
			$rootScope.tryButton = true;
		};
		console.info('Общая информация', uploader);


		// -------------------------------


		var controller = $scope.controller = {
			isImage: function(item) {
				var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
				return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
			}
		};
		$log.log("Image controller star");
	}


    function adminCtrl ($state, $scope, $log, $rootScope, $localStorage, Auth, Data) {
    	$log.log("Admin controller star");
    	valueEmpty();
		$scope.setAgent = false;

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
		// создаём свойство в объекте добавления
		function valueEmpty(){
			$scope.item = {
				type : '',
				name_obj: '',
				city: '',
				isolation_house: '',
				isolation_flat: '',
				discriptions : '',
				district: '',
				phone_agent : [],
				photo_object : [],
				price : null,
				room : null,
				space : null

			};
		}
		$scope.itemReset = function(){
			$log.log('reset');
			valueEmpty()
		};
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
								break;
							case 'password':
								$scope.emptyDataPassword = true;
								params += "Пароль; ";
								break;
							case 'firstname':
								$scope.emptyDataFirstName = true;
								params += "Имя; ";
								break;
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
								break;
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

		// получеиие данных пользователя
		Auth.getAuth(function(data) {
			$log.log("Значение которое возвращает запрос на одного пользователя ", data);
				$scope.authLogin = function(){
					return data;
				};
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
					if(String(error).indexOf("email") !== -1) {
						$scope.messageLogin =  "Вы ввели неправильный адресс электронной почты";
					} else if (String(error).indexOf("password") !== -1) {
						$scope.messageLogin =  "Вы ввели неправильный пароль";
					} else {
						$scope.messageLogin =  "Произошла незвестная ошибка сообщите администратору " + error;
					}
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
			$log.log(data);
			$log.log(data[0]);
			$scope.test = data[0];
			$scope.data = data;
		});
		// рандомные числа
		function randomInteger(min, max) {
			var rand = min + Math.random() * (max + 1 - min);
			rand = Math.floor(rand);
			return rand;
		}
		$scope.openFormObj = function(){
			$rootScope.newId = randomInteger(0, 500);
			$log.log($rootScope.newId);
		};
		// Добавление нового объекта
    	$scope.addNewObject = function(obj) {
			$log.log(obj);
			if(Data.validDataAddObj(obj)) {
				$scope.emptyData = false;
				var objForArr = [];
				angular.forEach($scope.item.phone_agent, function(value) {
					this.push(value);
				}, objForArr);
				if(Data.validArr(objForArr)) {
					if($rootScope.imageArray !== null && $rootScope.tryButton){
						var objVal = Data.validData(obj);
						if(!objVal.name_obj) {
							objVal.name_obj = '';
						}
						objVal.number_obj = $rootScope.newId;
						objVal.name_agent = $scope.userData.lastname + " " + $scope.userData.firstname;
						objVal.uid = $scope.setAgent;
						objVal.photo_object = $rootScope.imageArray;
						Data.setDataObj(objVal);
						$log.log('setted',objVal);
						valueEmpty();
						$scope.messageAddData = null;
						$scope.addForm = false;
						$rootScope.imageArray = null;
						$rootScope.tryButton = false;
					} else {
						$scope.messageAddData = "Вы добавили изображения но не загрузили их, пожалуйста нажмите кнопку 'Загрузить'";
					}
				} else {
					$scope.messageAddData = 'Вы ввели одинаковые телефон';
				}
			} else {
				$scope.emptyData = true;
				$scope.messageAddData = 'Заполните обязательные поля';
			}
    	};
		Data.getDataForm(function(data){
			if(data[0]) {
				$log.log(data);
				$scope.request = data;
			} else {
				$log.log('Данных о заявках нет')
			}
		});
		$scope.deleteForm = function(){
			Data.deleteForm();
		};
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