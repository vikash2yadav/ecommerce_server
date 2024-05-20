'use strict';
const {
  Model
} = require('sequelize');
const {STATUS} = require("../../Config/constant");

module.exports = (sequelize, DataTypes) => {
  class product_faq_reactions extends Model {
    static associate(models) {
      // define association here
    }
  }
  product_faq_reactions.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    product_faq_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    user_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    reaction_type: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      comment: "1 => Like 0 => Dislike "
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
    modelName: 'product_faq_reactions',
  });
  return product_faq_reactions;
};