'use strict';
/** @type {import('sequelize-cli').Migration} */
const {STATUS} = require("../../Config/constant");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_variants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      product_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'products', key: 'id' }
      },
      attribute_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'attributes', key: 'id' }
      },
      attribute_value: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      sku: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      is_default: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS?.NOT_DEFAULT,
        commet: "0 => not default 1 => default"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_variants');
  }
};