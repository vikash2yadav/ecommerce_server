'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class specification_categories extends Model {
    static associate(models) {
      specification_categories.belongsTo(models.specification_categories,{
        foreignKey: 'parent_id',
        onDelete: 'cascade'
      })
      specification_categories.hasMany(models.specification_categories,{
        foreignKey: 'parent_id',
        onDelete: 'cascade'
      })
      specification_categories.hasMany(models.product_specifications,{
        foreignKey: 'specification_category_id',
        onDelete: 'cascade'
      });
    }
  }
  specification_categories.init({
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
    parent_id: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'specification_categories', key: 'id'}
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
    modelName: 'specification_categories',
  });
  return specification_categories;
};