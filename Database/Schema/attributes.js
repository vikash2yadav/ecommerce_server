'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attributes extends Model {
    
    static associate(models) {
      attributes.hasMany(models.attribute_values, {
        foreignKey: 'attribute_id',
        onDelete: 'cascade'
       });
    }
  }
  attributes.init({
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
    modelName: 'attributes',
  });
  return attributes;
};