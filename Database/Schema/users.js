'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {

      users.hasMany(models.user_tokens, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      users.hasMany(models.user_otp_verifications, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      users.hasMany(models.products, {
        foreignKey: 'last_updated_by',
        onDelete: 'cascade'
      })
      users.hasMany(models.orders, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      users.hasMany(models.product_reviews, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      users.hasMany(models.carts, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      users.hasMany(models.product_faq_reactions, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      });
      users.hasMany(models.wishlists,{
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      users.hasMany(models.coupons, {
        foreignKey: 'created_by',
        onDelete: 'cascade'
      })
      users.hasMany(models.coupons, {
        foreignKey: 'created_by',
        onDelete: 'cascade'
      })
      users.hasMany(models.user_coupon_relations,{
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      users.hasMany(models.user_language_relations,{
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      users.belongsTo(models.users, {
        foreignKey: 'created_by',
        onDelete: 'cascade'
      });
      users.belongsTo(models.users, {
        foreignKey: 'updated_by',
        onDelete: 'cascade'
      });
      users.hasMany(models.users, {
        foreignKey: 'created_by',
        onDelete: 'cascade'
      });
      users.hasMany(models.users, {
        foreignKey: 'updated_by',
        onDelete: 'cascade'
      });
      users.belongsTo(models.users,{
        foreignKey: 'deleted_by',
        onDelete: 'cascade'
      });
      users.hasMany(models.users,{
        foreignKey: 'deleted_by',
        onDelete: 'cascade'
      });
      users.belongsTo(models.users,{
        foreignKey: 'status_changed_by',
        onDelete: 'cascade'
      });
      users.hasMany(models.users,{
        foreignKey: 'status_changed_by',
        onDelete: 'cascade'
      });
      users.hasMany(models.user_addresses, {
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
    }
  }
  users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING(255),
      set(val) {
        this.setDataValue('first_name', val.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()));
        this.setDataValue('full_name', `${this.getDataValue('first_name') || ''} ${this.getDataValue('last_name') || ''}`);
      },
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING(255),
      set(val) {
        this.setDataValue('last_name', val.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()));
        this.setDataValue('full_name', `${this.getDataValue('first_name') || ''} ${this.getDataValue('last_name') || ''}`);
      },
    },
    full_name: {
      allowNull: false,
      type: DataTypes.STRING(255),
      get() {
        return `${this.first_name ? this.first_name : ''} ${this.last_name ? this.last_name : ''}`;
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    birth_date: {
      allowNull: true,
      type: DataTypes.DATE
    },
    profile_image: {
      allowNull: true,
      type: DataTypes.STRING(500)
    },
    gender: {
      allowNull: true,
      type: DataTypes.STRING(255)
    },
    contact_no: {
      allowNull: true,
      type: DataTypes.STRING(255)
    },
    alternative_contact_no: {
      allowNull: true,
      type: DataTypes.STRING(255)
    },
    language_id: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'languages', key: 'id' }
    },
    created_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'users', key: 'id' }
    },
    updated_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'users', key: 'id' }
    },
    status_changed_by:{
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'users', key: 'id' }
    },
    deleted_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'users', key: 'id' }
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
    modelName: 'users',
  });
  return users;
};