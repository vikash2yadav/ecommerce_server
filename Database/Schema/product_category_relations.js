'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class product_category_relations extends Model {
    static associate(models) {
      product_category_relations.belongsTo(models.products,{
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
      product_category_relations.belongsTo(models.categories,{
        foreignKey: 'category_id',
        onDelete: 'cascade'
      })
    }
  }
  product_category_relations.init({
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
    category_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'categories', key: 'id' }
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
    modelName: 'product_category_relations',
  });
  return product_category_relations;
};