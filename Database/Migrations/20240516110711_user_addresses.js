'use strict';
/** @type {import('sequelize-cli').Migration} */
const {STATUS} = require("../../Config/constant")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      user_name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      contact_no: {
        allowNull: false,
        type: Sequelize.BIGINT(10)
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
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'cities', key: 'id' }
      }, 
      state_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'states', key: 'id' }
      },
      country_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'countries', key: 'id' }
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'users', key: 'id' }
      },
      instruction: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      is_default: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: STATUS.NOT_DEFAULT,
        comment: "0 => not default 1 => default"
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