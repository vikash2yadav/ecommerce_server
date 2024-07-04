'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class modules extends Model {
    static associate(models) {
      modules.belongsTo(models.admins, {
        foreignKey: 'created_by',
        onDelete: 'cascade'
      });
      modules.belongsTo(models.admins, {
        foreignKey: 'updated_by',
        onDelete: 'cascade'
      });
      modules.hasMany(models.permissions, {
        foreignKey: 'module_id',
        onDelete: 'cascade'
      });
    }
  }
  modules.init({
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
    created_by: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'admins', key: 'id'}
    },
    updated_by: {
      allowNull: true,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'admins', key: 'id'}
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
    modelName: 'modules',
  });
  return modules;
};