'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class user_tokens extends Model {
    static associate(models) {
      // define association here
    }
  }
  user_tokens.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    access_token: {
      allowNull: false,
      type: DataTypes.STRING(500)
    },
    user_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    status: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: STATUS?.ACTIVE,
      comment: "0 => In Active 1 => Active"
    },
    expires_at:{
      allowNull: false,
      type: DataTypes.DATE
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
    modelName: 'user_tokens',
  });
  return user_tokens;
};