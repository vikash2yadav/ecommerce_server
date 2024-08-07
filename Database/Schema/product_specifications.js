'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_specifications extends Model {
    static associate(models) {
      product_specifications.belongsTo(models.specification_categories,{
        foreignKey: 'specification_category_id',
        onDelete: 'cascade'
      });
      product_specifications.belongsTo(models.products,{
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
    }
  }
  product_specifications.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    specification_category_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'specification_categories', key: 'id'}
    },
    product_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'products', key: 'id'}
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    value: {
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
    modelName: 'product_specifications',
  });
  return product_specifications;
};