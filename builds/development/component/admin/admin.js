;(function() {
	"use strict";

	angular.module('ngAdmin', ['ngAnimate', 'ngCookies'])
		.config(adminConfig)
		.controller('adminCtrl', adminCtrl);

    function adminCtrl ($scope, $log, $rootScope, Auth, Data) {
    	$log.log("Admin controller star");
		$scope.userCredentials = {
			email: null,
			password: null
		};
		$scope.register = function(){
			$log.log($scope.userCredentials);
			Auth.login($scope.userCredentials).then(function(userData) {
				$log.log("User created with uid: " + userData.uid);
				$scope.messageForUser = "Пользователь зарегистрирован";
				// здесь будет сохранятся информация об пользователе.
				Auth.setItem(userData.uid, $scope.chexAdmin);
				
			}).catch(function(error) {
				$log.log(error);
				$scope.messageForUser = "Произошла ошибка сообщите администратору";
			});
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