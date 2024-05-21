'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_language_relations extends Model {
    static associate(models) {
      // define association here
    }
  }
  user_language_relations.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    user_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    language_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED
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
    modelName: 'user_language_relations',
  });
  return user_language_relations;
};