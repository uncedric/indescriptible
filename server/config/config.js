var Sequelize = require('sequelize');
var config = require('./config.json');

var Promise = require('bluebird');

exports.sequelize = new Sequelize(config.db.database,config.db.user,config.db.password,{
  host:config.db.host,
  logging:false,
  dialect:config.db.dialect
});



// exports.connection = connection;
exports.port = config.port;
exports.domain = config.domain;
exports.cryptKey    = config.cryptKey;
