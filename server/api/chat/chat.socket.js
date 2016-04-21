'use strict';

var chat = [];

console.log('Inicializando sockets')

exports.register = function(socket) {

  socket.on('chat:send',function (data) {
    console.log('Nuevo log de usuario'.yellow);
    console.log(data)
    socket.broadcast.emit('chat:send',data);

  });


  socket.on('chat:welcome',function (data) {
    console.log(`${data.name} entró al chat`)
  });


};
