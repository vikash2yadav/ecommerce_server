'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class partners extends Model {
    static associate(models) {
      partners.belongsTo(models.languages,{
        foreignKey: 'language_id',
        onDelete: 'cascade'
      });
      partners.belongsTo(models.roles,{
        foreignKey: 'role_id',
        onDelete: 'cascade'
      });
      partners.hasMany(models.partner_tokens,{
        foreignKey: 'partner_id',
        onDelete: 'cascade'
      })
      partners.hasMany(models.partner_otp_verifications, {
        foreignKey: 'partner_id',
        onDelete: ' cascade'
      })
      partners.belongsTo(models.partners, {
        foreignKey: 'created_by',
        onDelete: 'cascade'
      });
      partners.belongsTo(models.partners, {
        foreignKey: 'updated_by',
        onDelete: 'cascade'
      });
      partners.hasMany(models.partners, {
        foreignKey: 'created_by',
        onDelete: 'cascade'
      });
      partners.hasMany(models.partners, {
        foreignKey: 'updated_by',
        onDelete: 'cascade'
      });
      partners.belongsTo(models.partners,{
        foreignKey: 'deleted_by',
        onDelete: 'cascade'
      });
      partners.hasMany(models.partners,{
        foreignKey: 'deleted_by',
        onDelete: 'cascade'
      });
      partners.belongsTo(models.partners,{
        foreignKey: 'status_changed_by',
        onDelete: 'cascade'
      });
      partners.hasMany(models.partners,{
        foreignKey: 'status_changed_by',
        onDelete: 'cascade'
      });
      partners.hasMany(models.products, {
        foreignKey: 'vendor_id',
        onDelete: 'cascade'
      })
      partners.hasMany(models.cart_items, {
        foreignKey: 'vendor_id',
        onDelete: 'cascade'
      })
      partners.hasMany(models.order_items, {
        foreignKey: 'vendor_id',
        onDelete: 'cascade'
      })
      partners.hasMany(models.orders, {
        foreignKey: 'vendor_id',
        onDelete: 'cascade'
      })
    }
  }
  partners.init({
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
    country_code: {
      allowNull: true,
      type: DataTypes.STRING(5),
      defaultValue: '91'
    },
    contact_no: {
      allowNull: true,
      type: DataTypes.STRING(255)
    },
    alternative_country_code: {
      allowNull: true,
      type: DataTypes.STRING(5)
    },
    alternative_contact_no: {
      allowNull: true,
      type: DataTypes.STRING(255)
    },
    role_id: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'roles', key: 'id' }
    },
    language_id: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'languages', key: 'id' }
    },
    created_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'partners', key: 'id' }
    },
    updated_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'partners', key: 'id' }
    },
    status_changed_by:{
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'partners', key: 'id' }
    },
    deleted_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'partners', key: 'id' }
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
    modelName: 'partners',
  });
  return partners;
};