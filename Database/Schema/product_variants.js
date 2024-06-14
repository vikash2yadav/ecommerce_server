'use strict';
const {
  Model
} = require('sequelize');
const {STATUS} = require("../../Config/constant");
module.exports = (sequelize, DataTypes) => {
  class product_variants extends Model {
    static associate(models) {
      product_variants.belongsTo(models.products, {
        foreignKey: 'product_id',
        onDelete: 'cascade'
      });
      product_variants.belongsTo(models.attributes, {
        foreignKey: 'attribute_id',
        onDelete: 'cascade'
      });
      product_variants.belongsTo(models.attribute_values, {
        foreignKey: 'attribute_value_id',
        onDelete: 'cascade'
      });
      product_variants.hasMany(models.product_reviews, {
        foreignKey: 'product_variant_id',
        onDelete: 'cascade'
      })
      product_variants.hasMany(models.cart_items, {
        foreignKey: 'product_variant_id',
        onDelete: 'cascade'
      })
      product_variants.hasMany(models.order_items, {
        foreignKey: 'product_variant_id',
        onDelete: 'cascade'
      })
    }
  }
  product_variants.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    product_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'products', key: 'id' }
    },
    attribute_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'attributes', key: 'id' }
    },
    attribute_value_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'attribute_values', key: 'id' }
    },
    price: {
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    discount: {
      allowNull: false,
      type: DataTypes.BIGINT(3),
      defaultValue: STATUS.ZERO,
      comment: "percentages"
    },
    stock: {
      allowNull: false,
      type: DataTypes.BIGINT(20)
    },
    weight: {
      allowNull: false,
      type: DataTypes.STRING(255),
      comment: "in kg"
    },
    dimensions: {
      allowNull: false,
      type: DataTypes.STRING(255),
      comment: "lenght * width * height "
    },
    material: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    image: {
      allowNull: false,
      type: DataTypes.TEXT
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
    modelName: 'product_variants',
  });
  return product_variants;
};