'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_addresses extends Model {
    static associate(models) {
      user_addresses.belongsTo(models.users, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      });
      user_addresses.hasMany(models.users, {
        foreignKey: 'user_address_id',
        onDelete: 'cascade'
      });
    }
  }
  user_addresses.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    user_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'users', key: 'id' }
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
    modelName: 'user_addresses',
  });
  return user_addresses;
};