var Video = require('./video.model');

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
