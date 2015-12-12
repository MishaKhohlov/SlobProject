;(function() {
	"use strict";

	angular.module('ngAdmin', ['ngAnimate', 'ngCookies'])
		.config(adminConfig)
		.filter('userAccept', function() {
			return function(inputData, params) {
				var result = [];
				if (params) {
					angular.forEach(inputData, function(value, key) {
						if(value.uid == params) {
							result.push(value);
						}
					});
				}
					return result;

			};
		})
		.controller('adminCtrl', adminCtrl);

    function adminCtrl ($timeout, $state, $scope, $log, $rootScope, Auth, Data) {
    	$log.log("Admin controller star");
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
		Auth.getAuth(function(data) {
			$log.log("Значение которое возвращает запрос на одного пользователя", data);
				$scope.authLogin = function(){
					return data;
				}
				$scope.setAgent = data.uid;
					Data.getDataUser(data.uid, function (data) {
						$scope.userData = data;
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
					$scope.messageLogin =  "Произошла ошибка сообщите администратору" + error;
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
					$scope.messageForUser = "Пользователь зарегистрирован как" + $scope.userCredentials.email
							+ $scope.userCredentials.password + $scope.userCredentials.admin;
							// userData.uid
							$log.log($scope.userCredentials, userData.uid);
					Data.setDataUser($scope.userCredentials, userData.uid);
					clearAuthObj();
				}).catch(function (error) {
					$scope.messageForUser = "Произошла ошибка сообщите администратору" + error;
				});
			} else {
				$scope.messageForUser = "Заполните" + emptyParams($scope.userCredentials);
			}
		};
		$scope.logout = function(){
			$state.reload();
			Auth.logout();
		};
		// передача индекса при переходе на страницу с детальной информацией
		$scope.setIndex = function(index){
			$rootScope.index_a = index;
		};
		// получение данных
		$scope.data = Data.getData();
    	$log.log("Admin controller star");
    	//Добавление нового объекта
    	$scope.addNewObject = function(obj) {
    		$log.log(obj);
    	}

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