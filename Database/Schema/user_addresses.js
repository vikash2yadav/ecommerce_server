'use strict';
const {
  Model
} = require('sequelize');
const {STATUS} = require("../../Config/constant")
module.exports = (sequelize, DataTypes) => {
  class user_addresses extends Model {
    static associate(models) {
      user_addresses.belongsTo(models.cities, {
        foreignKey: 'city_id',
        onDelete: 'cascade'
      })
      user_addresses.belongsTo(models.countries, {
        foreignKey: 'country_id',
        onDelete: 'cascade'
      })
      user_addresses.belongsTo(models.states, {
        foreignKey: 'state_id',
        onDelete: 'cascade'
      })
      user_addresses.belongsTo(models.users, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
    }
  }
  user_addresses.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    user_name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    contact_no: {
      allowNull: false,
      type: DataTypes.BIGINT(10)
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
      references: { model: 'cities', key: 'id' }
    }, 
    state_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'states', key: 'id' }
    },
    country_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'countries', key: 'id' }
    },
    user_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'users', key: 'id' }
    },
    instruction: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    is_default: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: STATUS?.NOT_DEFAULT,
      comment: "0 => not default 1 => default"
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