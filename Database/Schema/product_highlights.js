'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_highlights extends Model {
    static associate(models) {
      product_highlights.belongsTo(models.products,{
        foreignKey: 'product_id',
        onDelete: 'cascade'
      });
    }
  }
  product_highlights.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    product_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'products', key: 'id'}
    },
    content: {
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
    modelName: 'product_highlights',
  });
  return product_highlights;
};