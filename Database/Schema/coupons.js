'use strict';
const {
  Model
} = require('sequelize');
const {STATUS} = require("../../Config/constant");
module.exports = (sequelize, DataTypes) => {
  class coupons extends Model {
    static associate(models) {
      coupons.belongsTo(models.users, {
        foreignKey: 'created_by',
        onDelete: 'cascade'
      })
      coupons.belongsTo(models.users, {
        foreignKey: 'updated_by',
        onDelete: 'cascade'
      })
      coupons.hasMany(models.user_coupon_relations,{
        foreignKey: 'coupon_id',
        onDelete: 'cascade'
      })
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
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'users', key: 'id' }
    },
    updated_by:{
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'users', key: 'id' }
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