require('./chat.css');
var io = require('socket.io-client');

module.exports = ['$timeout','Chat',function ($timeout,Chat) {

  var vm = this;
  vm.chat = [];

  var socket = io();

  Chat.historial()
    .success(function (data) {
      console.log(data)
      vm.chat = data;
    })
    .error(function (err) {
      console.error(err);
    });

  socket.on('chat:send',function (data) {
    console.log('alguien mandó un mensaje!')

    $timeout(function () {
      vm.chat.push(data)
    }, 0,true);
  });


  vm.login = function () {
    console.log('Iniciando sesión')
    var name = prompt('Escribe tu numbre :)');
    if (name) {
      vm.user = name;
      socket.emit('chat:welcome',{ name:name });
      setTimeout(function() {
        $('#texto').focus();
      }, 500);
    }
  }

  vm.send = function () {
    console.log('Enviando mensaje')

    var data = {
      message:vm.ChatForm.message,
      user:vm.user
    };

    socket.emit('chat:send',data);
    vm.chat.push(data)
    console.log(vm.chat)    
    vm.ChatForm.message = '';

  }


}];
