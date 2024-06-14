'use strict';
const {
  Model
} = require('sequelize');
const {STATUS} = require('../../Config/constant');

module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    static associate(models) {
      products.belongsTo(models.categories, {
        foreignKey: 'category_id',
        onDelete: 'cascade'
      });
      products.belongsTo(models.partners, {
        foreignKey: 'vendor_id',
        onDelete: 'cascade'
      });
      products.belongsTo(models.users, {
        foreignKey: 'last_updated_by',
        onDelete: 'cascade'
      });
      products.hasMany(models.order_items, {
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
      products.hasMany(models.product_reviews,{
        foreignKey: 'product_id',
        onDelete: 'cascade'
       })
      products.hasMany(models.product_faqs, {
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
      products.hasMany(models.wishlists,{
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
      products.hasMany(models.product_category_relations,{
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
      products.hasMany(models.new_releases,{
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
      products.hasMany(models.our_choices,{
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
      products.hasMany(models.best_sellers,{
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
      products.hasMany(models.product_variants, {
        foreignKey: 'product_id',
        onDelete: 'cascade'
      });
      products.hasMany(models.cart_items, {
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
    }
  }
  products.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    vendor_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'partners', key: 'id'}
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
    category_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'categories', key: 'id'}
    },
    last_updated_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'users', key: 'id'}
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