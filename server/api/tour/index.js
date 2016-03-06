var express = require('express');
var controller = require('./tour.controller');
var auth = require('./../../config/auth');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/',auth.isLogged, controller.create);
router.put('/:id',auth.isLogged, controller.update);
router.post('/:id',auth.isLogged, controller.imagen);
// router.patch('/:user_id', controller.update);
router.delete('/:id',auth.isLogged, controller.delete);

module.exports = router;
