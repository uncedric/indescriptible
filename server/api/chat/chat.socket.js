'use strict';
var Chat = require('./chat.model');
var sanitizer = require('sanitizer')
console.log('Inicializando sockets');

exports.register = function(socket) {

  socket.on('chat:send',function (data) {
    console.log('Nuevo log de usuario'.yellow);
    console.log(data)
    socket.broadcast.emit('chat:send',data);
    Chat.create({
        user:sanitizer.sanitize(data.user),
        message:sanitizer.sanitize(data.message)
      });


  });


  socket.on('chat:welcome',function (data) {
    console.log(`${data.name} entró al chat`);
    socket.broadcast.emit('chat:send',{alert:'Alguien entró al chat'});

  });


};
