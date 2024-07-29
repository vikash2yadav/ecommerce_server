'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_specifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      specification_category_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'specification_categories', key: 'id'}
      },
      product_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'products', key: 'id'}
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      value: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('product_specifications');
  }
};