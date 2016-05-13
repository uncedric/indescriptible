var angular = require('angular');
// require('./../assets/js/jquery.poptrox.min.js');

// Estilos
require('./../assets/css/bootstrap.min.css')
require('./../assets/css/style.css')

// Funciones del tema
require('./../assets/js/plugins.js')
require('./../assets/js/functions.js')

// Módulos de angular
require('./chat/chat.service')
// Aplicación
angular
  .module('app',[
    require('angular-route'),
    'app.chat.service'
  ])
    .config(['$routeProvider',function ($routeProvider) {
      $routeProvider
        .when('/', {
          template: '<dashboard></dashboard>'
        })
        .when('/historial', {
          template: '<historial></historial>'
        })
        .otherwise({
          redirectTo: '/'
        });
    }])
    .component('player',{
      templateUrl:'scripts/views/player.html',
      controller:require('./player')
    })
    .component('chat',{
      templateUrl:'scripts/chat/chat.html',
      controller:require('./chat/chat.controller')
    })
    .controller('MainCtrl',function () {

    })
    .directive('schrollBottom', function () {
      return {
        scope: {
          schrollBottom: "="
        },
        link: function (scope, element) {
          scope.$watchCollection('schrollBottom', function (newValue) {
            if (newValue) {
              $(element).scrollTop($(element)[0].scrollHeight);
            }
          });
        }
      }
    });
