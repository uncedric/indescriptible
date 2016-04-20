
exports.index = function (req, res) {
  res.json(['uno','dos','tres']);
}

exports.create = function (req, res) {
  console.log(req.body);
  res.json(req.body);
}
