'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class states extends Model {
    static associate(models) {
      states.belongsTo(models.countries, {
        foreignKey: 'country_id',
        onDelete: 'cascade'
      });
      states.hasMany(models.cities, {
        foreignKey: 'state_id',
        onDelete: 'cascade'
      });
      states.hasMany(models.user_addresses, {
        foreignKey: 'state_id',
        onDelete: 'cascade'
      })
    }
  }
  states.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    country_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'countries', key: 'id'}
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
    modelName: 'states',
  });
  return states;
};