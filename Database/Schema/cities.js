'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cities extends Model {
    static associate(models) {
      cities.belongsTo(models.states, {
        foreignKey: 'state_id',
        onDelete: 'cascade'
      });
      cities.hasMany(models.user_addresses, {
        foreignKey: 'city_id',
        onDelete: 'cascade'
      })
    }
  }
  cities.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    state_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'states', key: 'id'}
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
  }, {
    sequelize,
    modelName: 'cities',
  });
  return cities;
};