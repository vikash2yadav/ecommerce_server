'use strict';
const {
  Model
} = require('sequelize');
const {STATUS} = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    static associate(models) {
      categories.hasMany(models.best_sellers, {
        foreignKey: 'category_id',
        onDelete: 'cascade'
      });
      categories.belongsTo(models.users,{
        foreignKey: 'created_by',
        onDelete: 'cascade'
      });
      categories.belongsTo(models.users,{
        foreignKey: 'updated_by',
        onDelete: 'cascade'
      });
      categories.hasMany(models.new_releases, {
        foreignKey: 'category_id',
        onDelete: 'cascade'
      });
      categories.hasMany(models.our_choices, {
        foreignKey: 'category_id',
        onDelete: 'cascade'
      });
      categories.hasMany(models.product_category_relations,{
        foreignKey: 'category_id',
        onDelete: 'cascade'
      });
      categories.hasMany(models.products, {
        foreignKey: 'category_id',
        onDelete: 'cascade'
      });
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
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'users', key:'id'}
    },
    updated_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'users', key:'id'}
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