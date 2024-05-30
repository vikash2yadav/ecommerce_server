'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_language_relations extends Model {
    static associate(models) {
      user_language_relations.belongsTo(models.users,{
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      user_language_relations.belongsTo(models.languages,{
        foreignKey: 'language_id',
        onDelete: 'cascade'
      })
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
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'users', key: 'id' }
    },
    language_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'users', key: 'id' }
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