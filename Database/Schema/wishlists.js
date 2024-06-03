'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlists extends Model {
    static associate(models) {
      wishlists.belongsTo(models.users,{
        foreignKey: 'user_id',
        onDelete: 'cascade'
      })
      wishlists.belongsTo(models.products,{
        foreignKey: 'product_id',
        onDelete: 'cascade'
      })
    }
  }
  wishlists.init({
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
    product_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'products', key: 'id' }
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
    modelName: 'wishlists',
  });
  return wishlists;
};