'use strict';
const {
  Model
} = require('sequelize');
const { STATUS } = require('../../Config/constant');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {

    static associate(models) {
      roles.hasMany(models.admins,{
        foreignKey: 'role_id',
        onDelete: 'cascade'
      });
      roles.hasMany(models.partners,{
        foreignKey: 'role_id',
        onDelete: 'cascade'
      });
      roles.hasMany(models.permissions, {
        foreignKey: 'role_id',
        onDelete: 'cascade'
      });
    }
  }
  roles.init({
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
    modelName: 'roles',
  });
  return roles;
};