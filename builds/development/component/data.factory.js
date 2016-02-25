;(function(){
    'use strict';

    angular
        .module('ngData', ['firebase'])
        .factory('Data', dataFact);

    function dataFact($firebaseAuth, $firebaseObject, $firebaseArray, $q, $log, $rootScope, firebase_url, Auth){
        var ref = new Firebase(firebase_url);
        var usersRef = ref.child('user');
        var objRef = ref.child('object');
        var requestRef = ref.child('request');
        var dataObj = $firebaseArray(objRef);
        var dataForm = $firebaseArray(requestRef);

        function loaded(child){
                var usersRef = ref.child('user').child(child);
                var userObj = $firebaseObject(usersRef);
            return userObj;
        }
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
            // Загрузка заявок
            getDataForm: function(callback) {
                dataForm.$loaded().then(callback, function(error) {
                    console.log("Error dowload dataForm", error);
                });
            },
            deleteForm : function() {
                requestRef.set(null);
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
            setRequestObj: function(obj) {
                $log.log(obj);
                requestRef.push().set(obj);
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
            setlenghtCatalog: function(lenght){
                    if(lenght) {
                        $rootScope.dataLength = lenght;
                    } else {
                        $rootScope.dataLength = 0;
                    }
            },
            // Изменение объекта недвижимости
            updateData: function(obj){
                var obj = publickDataObj.validData(obj);
                // $log.log('vall',obj);
                var cloneObj = {};
                for(var key in obj) {

                    if(key == 'city' || key == 'discriptions' || key == 'district'
                     || key == 'isolation_house' || key == 'isolation_flat' || key == 'name_agent' || key == 'name_obj' || key == 'number_obj' || key == 'phone_agent'
                     || key == 'price' || key == 'room' || key == 'space' || 
                     key == 'type' || key == 'uid' || key == 'photo_object') {
                        cloneObj[key] = obj[key];
                    }
                  }
                // $log.log(cloneObj);
                objRef.child(obj.number_obj).set(cloneObj);
            }
    };

        return publickDataObj;
    }
})();