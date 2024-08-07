'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipped_addresses extends Model {
    static associate(models) {
      shipped_addresses.hasMany(models.orders,{
        foreignKey: 'shipped_addresses_id',
        onDelete: 'cascade'
      })
      shipped_addresses.belongsTo(models.cities,{
        foreignKey: 'city_id',
        onDelete: 'cascade'
      })
      shipped_addresses.belongsTo(models.states,{
        foreignKey: 'state_id',
        onDelete: 'cascade'
      })
      shipped_addresses.belongsTo(models.countries,{
        foreignKey: 'country_id',
        onDelete: 'cascade'
      })
    }
  }
  shipped_addresses.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    street: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    area: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    pin_code: {
      allowNull: false,
      type: DataTypes.BIGINT(6)
    },
    city_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'cities', key: 'id'}
    },
    state_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'states', key: 'id'}
    },
    country_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'countries', key: 'id'}
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
    modelName: 'shipped_addresses',
  });
  return shipped_addresses;
};