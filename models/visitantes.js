'use strict';

module.exports = function(sequelize, DataTypes) {
  var visitantes = sequelize.define('visitantes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        visitantes.belongsToMany(models.vistas, {
          through: {
            model: models.vistas_visitantes,
            unique: false
          },
          foreignKey: 'id_visitantes',
            
        });
      }
    }
  });
  
  return visitantes;
};