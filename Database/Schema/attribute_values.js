'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class attribute_values extends Model {
    static associate(models) {
     attribute_values.belongsTo(models.attributes, {
      foreignKey: 'attribute_id',
      onDelete: 'cascade'
     });
    }
  }
  attribute_values.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT(20).UNSIGNED
    },
    attribute_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'attributes', key: 'id' }
    },
    value: {
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
    modelName: 'attribute_values',
  });
  return attribute_values;
};