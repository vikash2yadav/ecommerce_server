'use strict';
const {
  Model
} = require('sequelize');
const {STATUS} = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class languages extends Model {
    static associate(models) {
      languages.hasMany(models.users, {
        foreignKey: 'language_id',
        onDelete: 'cascade'
      });
      languages.hasMany(models.user_language_relations,{
        foreignKey: 'language_id',
        onDelete: 'cascade'
      })
      languages.hasMany(models.admins,{
        foreignKey: 'language_id',
        onDelete: 'cascade'
      });
      languages.hasMany(models.partners,{
        foreignKey: 'language_id',
        onDelete: 'cascade'
      });
      languages.hasMany(models.users, {
        foreignKey: 'language_id',
        onDelete: 'cascade'
      })
    }
  }
  languages.init({
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
    code: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    is_default: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: STATUS.ZERO,
      comment: "0 => not default 1 => Default"
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
    modelName: 'languages',
  });
  return languages;
};