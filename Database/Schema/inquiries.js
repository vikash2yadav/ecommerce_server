'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inquiries extends Model {
    static associate(models) {
      // define association here
    }
  }
  inquiries.init({
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
    email: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    message: {
      allowNull: false,
      type: DataTypes.TEXT
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
    modelName: 'inquiries',
  });
  return inquiries;
};