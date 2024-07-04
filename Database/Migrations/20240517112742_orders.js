'use strict';
/** @type {import('sequelize-cli').Migration} */
const {ORDER_STATUS, STATUS} = require('../../Config/constant');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'users', key: 'id'}
      },
      vendor_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'partners', key: 'id'}
      },
      orderd_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      shipped_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      shipped_addresses_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'shipped_addresses', key: 'id'}
      },
      total_discount: {
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      total_items: {
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      total_amoumt: {
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      status: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: ORDER_STATUS?.PENDING,
        comment: "0 => Pending 1 => Shipped 2 => Delivered 3 => Cancelled"
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
    await queryInterface.dropTable('orders');
  }
};