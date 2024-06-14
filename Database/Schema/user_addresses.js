'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_addresses extends Model {
    static associate(models) {
      user_addresses.hasMany(models.users,{
        foreignKey: 'user_address_id',
        onDelete: 'cascade'
      });
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
    }
  }
  user_addresses.init({
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