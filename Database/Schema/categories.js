'use strict';
const {
  Model
} = require('sequelize');
const {STATUS} = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    static associate(models) {
      // define association here
    }
  }
  categories.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    description: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    created_by: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    updated_by: {
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
    modelName: 'categories',
  });
  return categories;
};