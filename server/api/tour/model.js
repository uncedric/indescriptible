var Sequelize = require('sequelize');
var sequelize = require('./../../config').sequelize;

var Tour = sequelize.define('tour', {
  codigo: {
    type: Sequelize.STRING(20),
  },
  titulo: {
    type: Sequelize.STRING(120),
  },
  descripcion:{
    type: Sequelize.TEXT,
  },
  // ruta del tour virtual dentro de la aplicación
  path:{
    type: Sequelize.STRING(140),
  },
  // ruta hacia el CRM inmobiliario
  url:{
    type: Sequelize.STRING(190),
  },
  imagen:{
    type: Sequelize.STRING(190),
  }
}, {
  // timestamps: false,
  // paranoid: true,
  // undescored:true,
  freezeTableName: true
});

Tour.sync({force:false}).done(function (data) {
  // if (data) {console.log('Modelo Tour actualizado');}
});

module.exports = Tour;
