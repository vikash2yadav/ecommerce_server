'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class product_category_relations extends Model {
    static associate(models) {
      // define association here
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
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    category_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    status: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: STATUS?.ACTIVE,
      comment: "0 => In Active 1 => Active"
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