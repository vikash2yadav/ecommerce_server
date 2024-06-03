'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('partner_otp_verifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      otp: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      partner_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'partners', key: 'id'}
      },
      expired_at:{
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
    await queryInterface.dropTable('partner_otp_verifications');
  }
};