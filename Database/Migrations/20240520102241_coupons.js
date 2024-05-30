'use strict';
/** @type {import('sequelize-cli').Migration} */
const {STATUS} = require("../../Config/constant");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      value: {
        allowNull: false,
        type: Sequelize.BIGINT(5)
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      expired: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.NOT_EXPIRED,
        comment: "0 => not_expired 1 => Expired"
      },
      expired_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_by:{
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'users', key: 'id' }
      },
      updated_by:{
        allowNull: true,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'users', key: 'id' }
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
    await queryInterface.dropTable('coupons');
  }
};