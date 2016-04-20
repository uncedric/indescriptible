var express = require('express');
var controller = require('./video.controller');

var router = express.Router();

router.get('/',controller.index);

router.get('/youtube',controller.youtube);

router.get('/online',controller.online);

router.get('/:id',controller.show);


module.exports = router;
