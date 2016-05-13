var Chat = require('./chat.model');

exports.index = function (req, res) {
  Chat.findAll({ limit:50,raw:true })
    .then(anteriores => {
      res.json(anteriores);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error al cargar el historial de chat');
    });
}

exports.create = function (req, res) {
  console.log(req.body);
  res.json(req.body);
}
