'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      order_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'orders', key: 'id'}
      },
      product_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'products', key: 'id'}
      },
      quantity:{
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      unit_price:{
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      unit_discount:{
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      total_discount:{
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      totoal_amount:{
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
    await queryInterface.dropTable('order_items');
  }
};