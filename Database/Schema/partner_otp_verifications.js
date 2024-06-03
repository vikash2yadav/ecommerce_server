'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class partner_otp_verifications extends Model {
    static associate(models) {
      partner_otp_verifications.belongsTo(models.partners, {
        foreignKey: 'partner_id',
        onDelete: ' cascade'
      })
    }
  }
  partner_otp_verifications.init({
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
    partner_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: {model: 'partners', key: 'id'}
    },
    expired_at:{
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
    modelName: 'partner_otp_verifications',
  });
  return partner_otp_verifications;
};