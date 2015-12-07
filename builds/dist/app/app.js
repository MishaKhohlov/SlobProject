;(function() {
	"use strict";

	angular.module('ngApp', ['ui.router', 'ngAnimate', 'ngCookies', 'ngCatalog',
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
        var ref = new Firebase(firebase_url);
        var auth = $firebaseAuth(ref);
        
        auth.$onAuth(function(authData) {
            if (authData) {
                $rootScope.authLogin = true;
                $log.log("Logged in as:", authData.uid);
            } else {
                $rootScope.authLogin = false;
                $log.log("Logged out");
            }
        });
        var publickAuthObj = {
            ngAuthObj: function(authObj){
                return ref.getAuth();
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
            getAuth: function(){
                return ref.getAuth();
            },
            auth: function() {
                var prom = $q.defer();
                if($rootScope.authLogin) {
                   prom.resolve();
                } else {
                    prom.reject();
                }
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

    function dataFact($firebaseAuth, $firebaseObject, $q, $log, $rootScope, firebase_url){
        var dataArr =  [
            {
                'type' : 'квартира', // дом, участки, нежилая недвижимость
                'number_obj' : 123,
                'name_obj' : 'Квартира 2км',
                'photo' : ['','','','',''],
                'isolation_house' : 'дача', // часть дома, целый дом
                'isolation_flat' : "Изолированные",
                'room' : 'Элитные', // 1,2,3,4 many, laxury
                'price': 2100,
                'city' : 'Харьков', // kharkiv prigorod
                'district' : 'Алеексеевка',
                'space' : 43,
                'phone_agent' : [675729181,2121232,37465349],
                'name_agent' : 'Karl',
                'adress' : 'street artilliryiska house 2/a',
                'discriptions' : 'This is descriptions'
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
                'adress' : 'street artilliryiska house 2/a',
                'discriptions' : 'This is descriptions'
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
                'name_agent' : 'Karl',
                'adress' : 'street artilliryiska house 2/a',
                'discriptions' : 'This is descriptions'
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
                'name_agent' : 'Karl',
                'adress' : 'street artilliryiska house 2/a',
                'discriptions' : 'This is descriptions'
            }
        ];

        var ref = new Firebase(firebase_url);
        var usersRef = ref.child('user');
        $rootScope.testData = $firebaseObject(ref);

        var publickDataObj = {
            getData: function(){
                return dataArr;
            },
            getDataItem: function(id) {
                return dataArr[id];
            },
            setDataUser: function (objUser) {
                $log.log(objUser);
                usersRef.set(objUser);
            },
            nameUser: function(){
                // Looog
                $log.log(Data.getAuth());
                Data.getAuth().email;
                usersRef.$load();
                // emailUser
            },
            updateData: function(data, callback){
                //var obj = {};
                //obj[user.$id] = {name: user.name, age: user.age};
                $log.log(data);
                //return usersRef.update(obj, callback);
            }
    };

        return publickDataObj;
    }
})();
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
			return function(inputData, params) {
			    console.log(inputData, params);
			  };
			})
		.controller('adminCtrl', adminCtrl);

    function adminCtrl ($state, $scope, $log, $rootScope, Auth, Data) {
    	$log.log("Admin controller star");
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
				admin: false
			};
		}

		// Вход
		$scope.login = function(){
			if(!emptyParamsLogin($scope.userLogin)){
				$scope.messageLogin = '';
				Auth.login($scope.userLogin).then(function(userData) {
					$scope.messageLogin = "Вход выполнен" + userData.password.email;
					$scope.setAgent = ;
					// объект с данными который возвращается после авторизации.
					// Auth.getAuth();
					clearAuthObj();
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
				Data.setDataUser($scope.userCredentials);
				/*Auth.register($scope.userCredentials).then(function (userData) {
					$scope.messageForUser = "Пользователь зарегистрирован как" + $scope.userCredentials.email
							+ $scope.userCredentials.password + $scope.userCredentials.admin;
					Data.setDataUser($scope.userCredentials, userData);
					clearAuthObj();
					// здесь будет сохранятся информация об пользователе.
					// Auth.setItem(userData.uid, $scope.chexAdmin);
				}).catch(function (error) {
					$scope.messageForUser = "Произошла ошибка сообщите администратору" + error;
				});*/
			} else {
				$scope.messageForUser = "Заполните" + emptyParams($scope.userCredentials);
			}
		};
		$scope.logout = function(){
			$state.reload();
			Auth.logout();
		};
		$scope.online = function(){

		};
		// передача индекса при переходе на страницу с детальной информацией
		$scope.setIndex = function(index){
			$rootScope.index_a = index;
		};
		// получение данных
		$scope.data = Data.getData();
    	$log.log("Admin controller star");
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
            $scope.data =  Data.getData();
            $scope.setIndex = function(index){
                $log.log(index);
              $rootScope.index = index;
            };
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

    angular.module('ngDataAboutAdmin', ['ngAnimate', 'ngCookies'])
        .config(aboutAdminConf)
        .controller('aboutAdminCtrl', aboutAdminCtrl);

    function aboutAdminCtrl ($scope, $log, Data, $state, $rootScope) {
        $log.debug("List_a controller star");

        if($rootScope.index_a >= 0) {
            $log.log("rootScope_a");
            $scope.item = Data.getDataItem($rootScope.index_a);
            $rootScope.index_a = -1;
            $log.log("rootScope_a 2");
        } else {
            $log.log("arr.some_a");
            var state = $state.params.id;
            Data.getData().some(function (element, index) {
                if (element.number_obj == state) {
                    $scope.item = Data.getDataItem(index);
                    return true;
                }
            });
            $log.log("arr.some_a 2");
        }
        $scope.updateData = function(){
          Data.updateData($scope.item, function(){
              $log.log("Error");
          })
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

        if($rootScope.index >= 0) {
            $log.log("rootScope");
            $scope.item = Data.getDataItem($rootScope.index);
            $rootScope.index = -1;
            $log.log("rootScope 2");
        } else {
            $log.log("arr.some");
            var state = $state.params.id;
            Data.getData().some(function (element, index) {
                if (element.number_obj == state) {
                    $scope.item = Data.getDataItem(index);
                    return true;
                }
            });
            $log.log("arr.some 2");
        }
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