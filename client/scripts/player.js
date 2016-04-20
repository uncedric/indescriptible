module.exports = ['$http',function ($http) {

  var vm = this;

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  function getLastVideo(retransmision) {
    console.log('Cargando últimos videos')
    $http.get('api/videos/youtube')
      .success(function (data) {
        console.log(data[1])
        if (retransmision) {
          vm.iframe = '<iframe src="https://www.youtube.com/embed/' + data[0] + '?autoplay=1" width="{{$ctrl.playerWidth}}" frameborder="0" id="live-video" allowfullscreen></iframe>';
          document.getElementById('anterior').innerHTML = vm.iframe;
        }

      })
      .error(function (err) {
        console.error(err)
      });
  }

  function verificarConexion(retransmision) {
    $http.get('http://img.youtube.com/vi/dxUI5Cg26N4/0.jpg')
      .success(function (data) {
        console.log(data);
        vm.live = true;
      })
      .error(function () {
        vm.live = false;
        getLastVideo(retransmision);
      });

      // volveremos a revisar la conexión en 1 minuto
      setTimeout(function() {
        verificarConexion(false);
      }, 120000);
  }

  verificarConexion(true);

}];

// $('#time_countdown').countDown({
//     targetDate: {
//         'day': day,
//         'month': month,
//         'year': year,
//         'hour': 15,
//         'min': 30,
//         'sec': 0
//     },
// 		omitWeeks: true
//   });
