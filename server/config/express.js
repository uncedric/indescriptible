var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var busboy = require('connect-busboy');
// var logger = require('morgan');  // Logs con IP y datos del navegador
var methodOverride = require('method-override');
var session = require('express-session');
var ejs = require('ejs');
var auth = require('./auth');
var SessionStore = require('express-mysql-session');
var config = require('./config.json');

var options = {
    host: config.db.host,
    port: 3306,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
};

var sessionStore = new SessionStore(options);

var passport = auth.passport;


module.exports = function (app) {
  // configure Express
  app.set('views', __dirname + './../views');
  app.set('view engine', 'ejs');
  // app.use(logger()); // Esta es la cosa que llena todo de logs ¬¬
  app.use(cookieParser());
  app.use(methodOverride());


  app.use(session({
    key: 'SpaceShuttle:3',
    secret: 'ShuttleSpace3:',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
  }));
  // app.use(session({ secret: 'spaceshuttle' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(app.router);
  //Para subir archivos
  app.use(bodyParser({
        keepExtensions: true,
        limit: 10000000, // 10M limit
        uploadDir: __dirname +'/temp' }));
  app.use(busboy());

  app.use(express.static(__dirname + './../../client'));

};
