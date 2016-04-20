var angular = require('angular');
// require('./../assets/js/jquery.poptrox.min.js');

// Estilos
require('./../assets/css/bootstrap.min.css')
require('./../assets/css/style.css')

// Funciones del tema
require('./../assets/js/plugins.js')
require('./../assets/js/functions.js')
// require('./../assets/js/jquery.ajaxchimp.min.js')

// Módulos de angular
require('./chat/chat.service')
// Aplicación
angular
  .module('app',[
    'app.chat.service'
  ])
    .component('player',{
      templateUrl:'scripts/views/player.html',
      controller:require('./player')
    })
    .component('chat',{
      templateUrl:'scripts/chat/chat.html',
      controller:require('./chat/chat.controller')
    })
    .controller('MainCtrl',function () {
      console.log('holi :2');
    })
