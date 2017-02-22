'use strict';

module.exports = function(sequelize, DataTypes) {
  var visitantes = sequelize.define('visitantes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      getId: function()  {
        var id = this.getDataValue('id');
        return id;
      }
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
          foreignKey: 'id_vistas',
            
        });
      }
    }
  });
  
  return visitantes;
};