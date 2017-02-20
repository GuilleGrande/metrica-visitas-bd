'use strict';
module.exports = function(sequelize, DataTypes) {
  var vistas_visitantes = sequelize.define('vistas_visitantes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_visitantes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_vistas: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  
  vistas.belongsToMany(visitantes, {
  through: {
    model: vistas_visitantes,
    unique: false
  },
  foreignKey: 'id_vistas'
  
  });
  
  
  
  return vistas_visitantes;
};