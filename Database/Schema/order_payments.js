'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require("../../Config/constant");
module.exports = (sequelize, DataTypes) => {
  class order_payments extends Model {
    static associate(models) {
      order_payments.belongsTo(models.orders,{
        foreignKey: 'order_id',
        onDelete: 'cascade'
      })
    }
  }
  order_payments.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    order_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'orders', key: 'id'}
    },
    mode: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    amount: {
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    status: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      comment: "0 => Failed 1 => Success"
    },
    is_delete: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: STATUS?.NOTDELETED,
      comment: "0 => Not Deleted 1 => Deleted"
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
    modelName: 'order_payments',
  });
  return order_payments;
};