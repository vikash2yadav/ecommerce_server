'use strict';
const {
  Model
} = require('sequelize');
const { STATUS, ROLE } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class admins extends Model {
    static associate(models) {
      admins.belongsTo(models.languages, {
        foreignKey: 'language_id',
        onDelete: 'cascade'
      });
      admins.belongsTo(models.roles, {
        foreignKey: 'role_id',
        onDelete: 'cascade'
      });
      admins.hasMany(models.admin_tokens, {
        foreignKey: 'admin_id',
        onDelete: 'cascade'
      })
      admins.hasMany(models.admin_otp_verifications, {
        foreignKey: 'admin_id',
        onDelete: ' cascade'
      })
      admins.hasMany(models.modules, {
        foreignKey: 'created_by',
        onDelete: 'cascade'
      });
      admins.hasMany(models.modules, {
        foreignKey: 'updated_by',
        onDelete: 'cascade'
      });
      admins.belongsTo(models.admins, {
        foreignKey: 'created_by',
        as: 'adminCreatedBy',
        onDelete: 'cascade'
      });
      admins.belongsTo(models.admins, {
        foreignKey: 'updated_by',
        as: 'adminUpdatedBy',
        onDelete: 'cascade'
      });
      admins.hasMany(models.admins, {
        foreignKey: 'created_by',
        // as: 'adminCreatedBy',
        onDelete: 'cascade'
      });
      admins.hasMany(models.admins, {
        foreignKey: 'updated_by',
        // as: 'adminUpdatedBy',
        onDelete: 'cascade'
      });
      admins.hasMany(models.categories, {
        foreignKey: 'created_by',
        as: 'createdBy',
        onDelete: 'cascade'
      })
      admins.hasMany(models.categories, {
        foreignKey: 'updated_by',
        as: 'updatedBy',
        onDelete: 'cascade'
      });
      admins.hasMany(models.users, {
        foreignKey: 'created_by',
        as: 'customerCreatedBy',
        onDelete: 'cascade'
      });
      admins.hasMany(models.users, {
        foreignKey: 'updated_by',
        as: 'customerUpdatedBy',
        onDelete: 'cascade'
      });
    }
  }
  admins.init({
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
    role_id: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      defaultValue: ROLE?.ADMIN,
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
      references: { model: 'admins', key: 'id', as: 'createdBy' }
    },
    updated_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'admins', key: 'id', as: 'updatedBy' }
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
    modelName: 'admins',
  });
  return admins;
};