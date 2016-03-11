var express = require('express');
var router  = express.Router();
var auth    = require('./../config/auth.js');
import Promise from 'bluebird';
import cp from 'child_process';
// import renderback from 'renderback';

var passport  = auth.passport;
Promise.promisifyAll(cp);


router.get('/login', function(req, res){

  if (typeof req.query.err!=='undefined') {
    var error = 'Contraseña incorrecta';
    res.render('login',{error:error});
  } else {
    res.render('login');
  }

});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login?err=1' }),
  function(req, res) {
    res.redirect('/');

  });


router.get('/logout', function(req, res){req.logout();res.redirect('/');  });

// Ruta principal de la aplicación
router.get('/', function (req,res) {
  res.render('index');
});

// bitbucket llama este de aquí :)
router.post('/deploy', function (req,res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Deploy fue invocado desde ${ip}`);
  res.send('Thanks :)');

  console.log('Importando código a producción... que la fuerza nos acompañe!!');
  cp.execAsync('git pull origin master')
    .then(function (data) {
      console.log('Pull realizado correctamente, procedemos a reiniciar el server'.green);
      console.log(data);
      return cp.execAsync(`cd /home/intrabits/webapps/nodex && export PATH=$PWD/bin/:$PATH  && npm install --production && pm2 reload indescriptible`);
    })
    .catch(function (err) {
      console.error(err)
    });

});




module.exports = router;
