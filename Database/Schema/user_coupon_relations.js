'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_coupon_relations extends Model {
    static associate(models) {
      user_coupon_relations.belongsTo(models.users,{
        foreignKey: 'user_id',
        onDelete: 'cascade'
      });
      user_coupon_relations.belongsTo(models.coupons,{
        foreignKey: 'coupon_id',
        onDelete: 'cascade'
      });
    }
  }
  user_coupon_relations.init({
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
    coupon_id: {
      allowNull: false,
      type: DataTypes.BIGINT(20).UNSIGNED,
      references: { model: 'coupons', key: 'id' }
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
    modelName: 'user_coupon_relations',
  });
  return user_coupon_relations;
};