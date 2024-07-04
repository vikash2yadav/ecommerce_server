'use strict';

const { STATUS } = require('../../Config/constant');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admin_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      }, 
      access_token: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      admin_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'admins', key: 'id' }
      },
      status: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS?.ACTIVE,
        comment: "0 => In Active 1 => Active"
      },
      expires_at:{
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('admin_tokens');
  }
};