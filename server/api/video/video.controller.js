var Video = require('./video.model');
var Xray = require('x-ray');
var xray = Xray();

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
}

exports.index = function (req, res) {
  Video.findAll({ raw:true })
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
