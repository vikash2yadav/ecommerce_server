'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_variant_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      product_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'products', key: 'id'}
      },
      strike_price: {
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      tag: {
        allowNull: true,
        type: Sequelize.TINYINT(1)
      },
      stock: {
        allowNull: false,
        type: Sequelize.BIGINT(20)
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
    await queryInterface.dropTable('product_variant_details');
  }
};