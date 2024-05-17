'use strict';
const {
  Model
} = require('sequelize');
const {STATUS} = require('../../Config/constant');

module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    static associate(models) {
      // define association here
    }
  }
  products.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    suplier_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    slug: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    image:{
      allowNull: false,
      type: DataTypes.TEXT
    },
    category_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
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
    color: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    material: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    last_updated_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED
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
    modelName: 'products',
  });
  return products;
};