'use strict';

const { STATUS } = require('../../Config/constant');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      cart_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'carts', key: 'id'}
      },
      product_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'products', key: 'id'}
      },
      product_variant_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'product_variants', key: 'id'}
      },
      vendor_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: {model: 'partners', key: 'id'}
      },
      quantity: {
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      total_price: {
        allowNull: false,
        type: Sequelize.BIGINT(20)
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
    await queryInterface.dropTable('cart_items');
  }
};