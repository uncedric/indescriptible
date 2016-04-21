
exports.index = function (req, res) {
  res.json([
    {
      user:'Indescriptible',
      text:'Bienvenido!'
    }
  ]);
}

exports.create = function (req, res) {
  console.log(req.body);
  res.json(req.body);
}
