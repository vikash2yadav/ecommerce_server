'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_variant_details extends Model {
    static associate(models) {
      // define association here
    }
  }
  product_variant_details.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    sku: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    strike_price: {
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    price: {
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    tag: {
      allowNull: true,
      type: DataTypes.TINYINT(1)
    },
    stock: {
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
    modelName: 'product_variant_details',
  });
  return product_variant_details;
};