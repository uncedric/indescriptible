var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

var Config = sequelize.define('config', {

  setting: {
    type: Sequelize.STRING(40)
  },
  value: {
    type: Sequelize.TEXT
  },
  description: {
    type: Sequelize.STRING(140)
  },
}, {
  timestamps: true,
  freezeTableName: true // Model tableName will be the same as the model name
});

Config.sync().done(function () {
});

module.exports = Config;
