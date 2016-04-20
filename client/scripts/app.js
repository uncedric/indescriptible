var angular = require('angular');
// require('./../assets/js/jquery.poptrox.min.js');

// Estilos
require('./../assets/css/bootstrap.min.css')
require('./../assets/css/style.css')

// Funciones del tema
require('./../assets/js/plugins.js')
require('./../assets/js/functions.js')
// require('./../assets/js/jquery.ajaxchimp.min.js')

// Aplicación
angular
  .module('app',[
  ])
    .component('player',{
      templateUrl:'scripts/views/player.html',
      controller:require('./player')
    })
    .controller('MainCtrl',function () {
      console.log('holi :2');
    })
