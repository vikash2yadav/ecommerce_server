'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class product_faqs extends Model {
    static associate(models) {
      product_faqs.belongsTo(models.products, {
        foreignKey: 'product_id',
        onDelete: 'cascade'
      });
      product_faqs.hasMany(models.product_faq_reactions,{
        foreignKey: 'product_faq_id',
        onDelete: 'cascade'
      });
      product_faqs.belongsTo(models.admins, {
        foreignKey: 'created_by',
        as: 'productFaqCreatedBy',
        onDelete: 'cascade'
      });
      product_faqs.belongsTo(models.admins, {
        foreignKey: 'updated_by',
        as: 'productFaqUpdatedBy',
        onDelete: 'cascade'
      });
    }
  }
  product_faqs.init({
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
    question: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    answer: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    created_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'admins', key: 'id', as: 'productFaqCreatedBy' }
    },
    updated_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'admins', key: 'id', as: 'productFaqUpdatedBy' }
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
    modelName: 'product_faqs',
  });
  return product_faqs;
};