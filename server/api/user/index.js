var express = require('express');
var controller = require('./user.controller');
var auth = require('./../../config/auth');

var router = express.Router();

// router.get('/', controller.index);
router.get('/profile', auth.isLogged, controller.me);
// actualizar perfil
router.put('/profile', auth.isLogged, controller.update);
router.put('/', controller.update);

// Registrarse para recibir notificaciones
router.post('/subscribe', auth.isLogged, controller.subscribe);
// Cambiar foto de perfil
router.post('/upload', auth.isLogged, controller.upload);

// Cargar detalles de un usuario
router.get('/:id', controller.show);


// router.delete('/:user_id', controller.destroy);

// generar password :)
router.get('/password/:password',controller.password);

module.exports = router;
