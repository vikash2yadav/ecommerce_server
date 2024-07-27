'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_specifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_specifications.init({
    firstName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product_specifications',
  });
  return product_specifications;
};