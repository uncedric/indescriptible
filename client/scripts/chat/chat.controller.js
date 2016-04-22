require('./chat.css');

module.exports = ['$timeout',function ($timeout) {

  var vm = this;
  vm.chat = [{user:'Indescriptible Radio',text:'Bienvenido :)'}];

  var socket = io();

  socket.on('chat:send',function (data) {
    console.log('alguien mandó un mensaje!')

    $timeout(function () {
      vm.chat.push(data)
    }, 0,true);
    console.log(vm.chat)
    // $('#chat').append( "<li class=\"list-group-item\" ><strong>" + data.user + "</strong>"  + data.text + '</li>');
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
      text:vm.ChatForm.text,
      user:vm.user
    };

    socket.emit('chat:send',data);
    vm.chat.push(data)
    console.log(vm.chat)
    // $('#chat').append( "<li class=\"list-group-item\" ><strong>" + data.user + "</strong>"  + data.text + '</li>');
    vm.ChatForm.text = '';

  }


}];
