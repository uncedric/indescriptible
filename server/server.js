require("babel/register");
var config 	  = require('./config');
var app    	  = require('./config/express').app;
var colors 	  = require('colors');
var os = require('os');
var prettyBytes = require('pretty-bytes');

// Api con la que se comunicará Angularjs y las aplicaciones móviles
app.use('/api/', require('./routes/api'));

// Rutas exclusivas que usaremos en node.js
app.use('/', require('./routes/index'));


// Errores más amigables en caso de cosas inesperado
// app.use(function(err, req, res) {
//
//   console.error(err);
//     res.status(err.status || 500);
//   res.render('error', {
//       message: 'Ocurrió algo inesperado dentro de la aplicación, estamos trabajando para resolverlo.',
//       error: {}
//   });
// });
app.use(function (req, res) {
  res.send('Not found');
});

console.log('===================== Server details ===================='.blue);

console.log(`Total Ram ${prettyBytes(os.totalmem())}`)
console.log(`Available Ram ${prettyBytes(os.freemem())}`)
console.log(`CPU's ${os.cpus().length}`)

app.listen(config.port);
console.log(colors.blue('=========== Iniciando aplicación. Puerto '+config.port+' ============'));
