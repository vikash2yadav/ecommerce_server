'use strict';

const { STATUS } = require('../../Config/constant');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      product_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      rating: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
      },
      comment: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      status: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS?.ACTIVE,
        comment: "0 => In Active 1 => Active"
      },
      is_delete: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS?.NOTDELETED,
        comment: "0 => Not Deleted 1 => Deleted"
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
    await queryInterface.dropTable('product_reviews');
  }
};