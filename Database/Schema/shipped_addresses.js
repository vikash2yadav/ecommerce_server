'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipped_addresses extends Model {
    static associate(models) {
      // define association here
    }
  }
  shipped_addresses.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    order_id: {
      allowNull: false,
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
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    state_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    country_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
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