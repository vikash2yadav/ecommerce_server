'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_items extends Model {
    static associate(models) {
      // define association here
    }
  }
  order_items.init({
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
    product_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    quantity:{
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    unit_price:{
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    unit_discount:{
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    total_discount:{
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    totoal_amount:{
      allowNull: false,
      type: DataTypes.BIGINT(20)
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
    modelName: 'order_items',
  });
  return order_items;
};