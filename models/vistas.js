'use strict';
const models = require('./models');

module.exports = function(sequelize, DataTypes) {
  var vistas = sequelize.define('vistas', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },{ 
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
          vistas.belongsToMany(models.visitantes, {
            through: {
              model: models.vistas_visitantes,
              unique: false
              
            },
            foreignKey: 'id_visitantes',
              
          });
      }
    }
  });
  
  return vistas;
};