(function () {
  'use strict';
  angular
    .module('app.chat.service',  [])

      .factory ('Chat', ['$http',function ($http) {

        return {
          historial:function () {
            return $http.get('/api/chat/');
          },
          send:function (data) {
            return $http({
              url:'/api/chat',
              method:'POST',
              data:data
            });
          },
          login:function (data) {
            return $http({
              url:'/api/users',
              method:'POST',
              data:data
            });
          },
          users:function () {
            return $http.get('api/chat/');
          },
          necesidad:function (id) {
            return $http.get('/api/chat//' + id);
          },
          necesidades:function () {
            return $http.get('api/chat/');
          }
        };
      }]);

})();
