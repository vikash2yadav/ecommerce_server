'use strict';
const {
  Model
} = require('sequelize');
const {STATUS} = require("../../Config/constant");
module.exports = (sequelize, DataTypes) => {
  class coupons extends Model {
    static associate(models) {
      // define association here
    }
  }
  coupons.init({
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
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    value: {
      allowNull: false,
      type: DataTypes.BIGINT(5)
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    expired: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: STATUS.NOT_EXPIRED,
      comment: "0 => not_expired 1 => Expired"
    },
    expired_time: {
      allowNull: false,
      type: DataTypes.DATE
    },
    created_by:{
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    updated_by:{
      allowNull: true,
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
    modelName: 'coupons',
  });
  return coupons;
};