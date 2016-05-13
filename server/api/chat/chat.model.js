var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

var Chat = sequelize.define('chat', {
  user: {
    type: Sequelize.STRING(140)
  },
  message: {
    type: Sequelize.TEXT
  }
}, {
  timestamps: true,
  freezeTableName: true // Model tableName will be the same as the model name
});

Chat.sync().done(function () {
});

module.exports = Chat;
