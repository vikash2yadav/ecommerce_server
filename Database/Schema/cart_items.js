'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class cart_items extends Model {
    static associate(models) {
      cart_items.belongsTo(models.carts, {
        foreignKey: 'cart_id',
        onDelete: 'cascade'
      })
      cart_items.belongsTo(models.products, {
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
      cart_items.belongsTo(models.product_variants, {
        foreignKey: 'product_variant_id',
        onDelete: 'cascade'
      })
      cart_items.belongsTo(models.partners, {
        foreignKey: 'vendor_id',
        onDelete: 'cascade'
      })
    }
  }
  cart_items.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    cart_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'carts', key: 'id'}
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
    quantity: {
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    total_price: {
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    status: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: STATUS?.ACTIVE,
      comment: "0 => In Active 1 => Active"
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
    modelName: 'cart_items',
  });
  return cart_items;
};