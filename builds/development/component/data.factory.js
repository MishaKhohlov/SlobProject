;(function(){
    'use strict';

    angular
        .module('ngData', ['firebase'])
        .factory('Data', dataFact);

    function dataFact($firebaseAuth, $firebaseObject, $q, $log, $rootScope, firebase_url, Auth){
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
                'uid' : '5bd43971-a152-4ac5-93eb-ebb4279823f1'
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
                'uid' : '5bd43971-a152-4ac5-93eb-ebb4279823f1'
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

        function loaded(child){
                var usersRef = ref.child('user').child(child);
                var userObj = $firebaseObject(usersRef);
            return userObj;
        }
        var publickDataObj = {
            getDataUser: function(uid, callback){
                loaded(uid).$loaded().then(callback, function(error) {
                    console.log("Error dowload  user ", error);
                });
            },
            getData: function(){
                return dataArr;
            },
            getDataItem: function(id) {
                return dataArr[id];
            },
            setDataUser: function (objUser, uid) {
                var cloneObj = {};
                for(var key in objUser)
                    cloneObj[key] = objUser[key];
                delete cloneObj.password;
                cloneObj.uid = uid;
                $log.log(cloneObj);
                usersRef.child(cloneObj.uid).set(cloneObj);
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