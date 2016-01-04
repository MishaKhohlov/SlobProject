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

            validData: function(obj) {
                if(obj) {
                    for (var key in obj) {
                        if(obj[key] == "" || obj[key] == undefined || obj[key] == null || obj[key] == []) {
                            delete obj[key];
                        }
                    }
                    if(obj.city == 'Пригород') {
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
                    $log.log('valid', obj);
                    return obj;
                }
            },
            // Проверка что бы в массиве не было одинаковых значений
            validArr: function(arr){
                var index = 0;
                var result = true;
                arr.forEach(function(inter){
                    var perem = inter;
                      for (var i = 0; i < arr.length; i++) {
                          if(i !== index) {
                              if(perem == arr[i] && arr[i] !== null) {
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
            validDataAddObj: function(obj) {
                var access = true;
                if(obj.type == 'Квартира' && obj.isolation_flat == '') {
                    access = false;
                }
                if(obj.type == 'Дом' && obj.isolation_house == '') {
                    access = false;
                }
                if(obj.type == 'Квартира' || obj.type == 'Дом') {
                    if(obj.room == '')
                        access = false;
                }
                if(obj.city == 'Харьков' && obj.district == '' ) {
                    access = false;
                }
                if(obj.type == '' || obj.price == null || obj.city == '' || obj.space == null) {
                    access = false;
                }
                $log.log(access);
                return access;
            },
            // Изменение объекта недвижимости
            updateData: function(obj){
                var obj = publickDataObj.validData(obj);
                $log.log(obj);
                var cloneObj = {};
                for(var key in obj) {

                    if(key == 'city' || key == 'discriptions' || key == 'district'
                     || key == 'isolation_house' || key == 'isolation_flat' || key == 'name_agent' || key == 'name_obj' || key == 'number_obj' || key == 'phone_agent'
                     || key == 'price' || key == 'room' || key == 'space' || 
                     key == 'type' || key == 'uid') {
                        cloneObj[key] = obj[key];
                    }
                  }
                $log.log(cloneObj);
                objRef.child(obj.number_obj).set(cloneObj);
            }
    };

        return publickDataObj;
    }
})();