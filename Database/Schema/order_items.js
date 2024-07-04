'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_items extends Model {
    static associate(models) {
      order_items.belongsTo(models.orders, {
        foreignKey: 'order_id',
        onDelete: 'cascade'
      })
      order_items.belongsTo(models.products, {
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
      order_items.belongsTo(models.partners, {
        foreignKey: 'vendor_id',
        onDelete: 'cascade'
      })
      order_items.belongsTo(models.product_variants, {
        foreignKey: 'product_variant_id',
        onDelete: 'cascade'
      })
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
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'orders', key: 'id'}
    },
    product_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'products', key: 'id'}
    },
    product_variant_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'product_variants', key: 'id'}
    },
    vendor_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'partners', key: 'id'}
    },
    attribute:{
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    attribute_value: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    image: {
      allowNull: false,
      type: DataTypes.TEXT
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
    total_amount:{
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