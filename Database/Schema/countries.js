'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class countries extends Model {
    static associate(models) {
      countries.hasMany(models.states, {
        foreignKey: 'country_id',
        onDelete: 'cascade'
      });
      countries.hasMany(models.user_addresses, {
        foreignKey: 'country_id',
        onDelete: 'cascade'
      })
    }
  }
  countries.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'countries',
  });
  return countries;
};