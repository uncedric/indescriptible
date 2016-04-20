var express = require('express');
var controller = require('./chat.controller');

var router = express.Router();

router.get('/',controller.index);

router.post('/',controller.create);


module.exports = router;
