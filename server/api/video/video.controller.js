var Video = require('./video.model');
var Xray = require('x-ray');
var xray = Xray();
var request = require('request');

exports.youtube = function (req, res) {
  var videos = [];
  console.log('Cargando video anterior')
  xray('https://www.youtube.com/channel/UCP1SEa4jrYDOjdJXUNcs8VA', ['a.yt-uix-tile-link@href',true])(function (err,data) {
    if (err) {
      console.log(err)
      res.status(500).send('Erro al cargar el video :/');
    } else {

      data.map((item) => {
        item = item.split('=');
        videos.push(item[1]);
      })

      res.json(videos);
    }
  })
};

exports.online = function (req, res) {
  console.log('comprobando video')

  xray('https://www.youtube.com/channel/UCP1SEa4jrYDOjdJXUNcs8VA', '.yt-lockup-title')(function (err,data) {
    if (err) {
      console.log(err)
      res.status(500).send('Error');
    } else {

      console.log(data)

      if (data.indexOf('vivo')>-1) {
        console.log('Programa en vivo'.green)
        res.send('Programa en vivo')
      } else {
        console.log('No hay streaming disponible'.yellow)
        res.status(404).send('No estamos en vivo :(');
      }
    }
  })
  // request
  //   .get('https://i.ytimg.com/vi/dxUI5Cg26N4/mqdefault_live.jpg')
  //   .on('response', function(response) {
  //     console.log(response.statusCode) // 200
  //     console.log(response.headers['content-type']) // 'image/png'
  //     res.send(String(response.statusCode))
  //     res.status(response.statusCode).send(String(response.statusCode));
  //   })
}

exports.index = function (req, res) {
  Video.findAll({ raw:true , where:{ id:{$not:1}} })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err)
      res.status(500).send('Error al cargar los videos');
    });
}

exports.show = function (req, res) {
  Video.findOne({ where: { id:req.params.id }, raw:true })
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err)
      res.status(500).send('Error al cargar el video');
    });
}
