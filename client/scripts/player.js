

module.exports = ['$http',function ($http) {

  var vm = this;
  vm.loading = true;

  function getLastVideo(retransmision) {
    console.log('Cargando últimos videos')
    $http.get('api/videos/youtube')
      .success(function (data) {

        if (retransmision) {
          vm.loading = false;
          vm.iframe = '<iframe src="https://www.youtube.com/embed/' + data[1] + '?autoplay=1"  frameborder="0" id="live-video" allowfullscreen></iframe>';
          document.getElementById('anterior').innerHTML = vm.iframe;
        }

      })
      .error(function (err) {
        console.error(err)
      });
  }

  function verificarConexion(retransmision) {
    $http.get('api/videos/online')
      .success(function (data) {
        console.log(data);
        vm.live = true;
        vm.loading = false;
        document.getElementById('anterior').innerHTML = '.';
      })
      .error(function () {
        vm.live = false;
        getLastVideo(retransmision);
      });

      // volveremos a revisar la conexión en 1 minuto
      setTimeout(function() {
        verificarConexion(false);
      }, 90000);
  }

  verificarConexion(true);

}];

// var dateObj = new Date();
// var month = dateObj.getUTCMonth() + 1; //months from 1-12
// var day = dateObj.getUTCDate();
// var year = dateObj.getUTCFullYear();

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
