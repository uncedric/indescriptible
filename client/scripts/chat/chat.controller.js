module.exports = ['Chat',function (Chat) {

  var vm = this;
  vm.chat = [];

  Chat.index()
    .success(function (data) {
      vm.chat = data;
    })
    .error(function (err) {
      console.error(err)
    });

  vm.login = function () {
    console.log('Iniciando sesión')
    console.log(vm.ChatForm)
    Chat.login(vm.ChatForm)
      .success(function (data) {
        vm.user = data;
      })
      .error(function (err) {
        console.error(err)
      });
  }

  vm.send = function () {
    Chat.send(vm.ChatForm)
      .success(function (data) {
        vm.chat.push(data);
      })
      .error(function (err) {
        console.error(err)
      });
  }
}];
