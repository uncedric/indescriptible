var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

var Video = sequelize.define('video', {

  titulo: {
    type: Sequelize.STRING(140)
  },
  descripcion: {
    type: Sequelize.TEXT
  },
  youtube: {
    type: Sequelize.STRING(50)
  },
  programaId: {
    type: Sequelize.INTEGER
  },
  visitas: {
    type: Sequelize.INTEGER
  },  
}, {
  timestamps: true,
  freezeTableName: true // Model tableName will be the same as the model name
});

Video.sync().done(function () {
});

module.exports = Video;
