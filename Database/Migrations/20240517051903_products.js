'use strict';
/** @type {import('sequelize-cli').Migration} */
const {STATUS} = require('../../Config/constant');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      suplier_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'users', key: 'id' }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      slug: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      image:{
        allowNull: false,
        type: Sequelize.TEXT
      },
      category_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'categories', key: 'id' }
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      discount: {
        allowNull: false,
        type: Sequelize.BIGINT(3),
        defaultValue: STATUS.ZERO,
        comment: "percentages"
      },
      stock: {
        allowNull: false,
        type: Sequelize.BIGINT(20)
      },
      weight: {
        allowNull: false,
        type: Sequelize.STRING(255),
        comment: "in kg"
      },
      dimensions: {
        allowNull: false,
        type: Sequelize.STRING(255),
        comment: "lenght * width * height "
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      material: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      last_updated_by: {
        allowNull: true,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'users', key: 'id' }
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
    await queryInterface.dropTable('products');
  }
};