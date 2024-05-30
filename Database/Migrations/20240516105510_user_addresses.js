'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      area: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      pin_code: {
        allowNull: false,
        type: Sequelize.BIGINT(6)
      },
      city_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      state_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      country_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED
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
    await queryInterface.dropTable('user_addresses');
  }
};