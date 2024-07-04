'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissions extends Model {
    static associate(models) {
      permissions.belongsTo(models.roles, {
        foreignKey: 'role_id',
        onDelete: 'cascade'
      });
      permissions.belongsTo(models.modules, {
        foreignKey: 'module_id',
        onDelete: 'cascade'
      });
    }
  }
  permissions.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    role_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'roles', key: 'id' }
    },
    module_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'modules', key: 'id' }
    },
    read: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
      comment: '0 => not_access 1 => access'
    },
    write: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
      comment: '0 => not_access 1 => access'
    },
    delete: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
      comment: '0 => not_access 1 => access'
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
    modelName: 'permissions',
  });
  return permissions;
};