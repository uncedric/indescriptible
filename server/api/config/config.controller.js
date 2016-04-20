var Config = require('./config.model');

exports.index = function (req, res) {
  Config.findAll()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      console.error(err)
      res.status(500).send('Error al cargar la configuración');
    });
}

exports.update = function (req, res) {
  Config.findById(req.params.id)
    .then(function (data) {
      data.value = req.body.value;
      return data.save()
    })
    .then(()=>{
      res.send('Registro actualizado')
    })
    .catch(function (err) {
      console.error(err)
      res.status(500).send('Error al actualizar');
    });
}
