;(function() {
	"use strict";

	angular.module('ngAdmin', ['ngAnimate', 'ngCookies'])
		.config(adminConfig)
		.controller('adminCtrl', adminCtrl);

    function adminCtrl ($scope, $log, $rootScope, Auth, Data) {
    	$log.log("Admin controller star");
		$scope.userLogin = {
			email: null,
			password: null
		};
		$scope.userCredentials = {
			email: null,
			password: null
		};
		function errorMessage(error){
			$scope.messageLogin =  "Произошла ошибка сообщите администратору" + error;
		}
		function completeMessage(userData){
			$scope.messageLogin = "Вход выполнен" + userData.password.email;
		}
		function clearAuthObj(){
			$scope.userCredentials = {
				email: null,
				password: null
			};
			$scope.userCredentials = {
				email: null,
				password: null
			};
		}
		$scope.login = function(){
			Auth.login($scope.userLogin).then(function(userData) {
				completeMessage(userData);
				clearAuthObj();
			}).catch(function(error) {
				errorMessage(error);
			});
		};
		$scope.register = function(){
			$log.log($scope.userCredentials);
			Auth.register($scope.userCredentials).then(function(userData) {
				$scope.messageForUser = "Пользователь зарегистрирован как" + userData.email + userData.password;
				clearAuthObj();
				// здесь будет сохранятся информация об пользователе.
				// Auth.setItem(userData.uid, $scope.chexAdmin);
			}).catch(function(error) {
				errorMessage(error);
			});
		};
		$scope.logout = function(){
			Auth.logout();
		};
		$log.log(Auth.ngAuthObj());
		$scope.online = function(){

		};
		$scope.setImage = function(){

		};
		$scope.setIndex = function(index){
			$rootScope.index_a = index;
		};
		$scope.data = Data.getData();
    	$log.log("Admin controller star");
    }

     function adminConfig($stateProvider){
		 $stateProvider
				 .state('admin', {
					 url: '/admin',
					 templateUrl: 'component/admin/admin.html',
					 controller: 'adminCtrl',
					 resolve: {
						 item: function(Auth) {
							 return Auth.auth()
						 }
					 }
				 })
    }
})();