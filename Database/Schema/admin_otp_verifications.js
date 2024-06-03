'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin_otp_verifications extends Model {
    static associate(models) {
      admin_otp_verifications.belongsTo(models.admins, {
        foreignKey: 'admin_id',
        onDelete: ' cascade'
      })
    }
  }
  admin_otp_verifications.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    otp: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    admin_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'admins', key: 'id' }
    },
    expired_at: {
      allowNull: false,
      type: DataTypes.DATE
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
    modelName: 'admin_otp_verifications',
  });
  return admin_otp_verifications;
};