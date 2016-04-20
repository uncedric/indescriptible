var express = require('express');
var controller = require('./config.controller');

var router = express.Router();

router.get('/',controller.index);

router.post('/:id',controller.update);



module.exports = router;
