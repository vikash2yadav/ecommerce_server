'use strict';

/** @type {import('sequelize-cli').Migration} */
const {STATUS, ROLE_TYPES, LANG} = require("../../Config/constant");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20).UNSIGNED
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(255),
        set(val) {
          this.setDataValue('first_name', val.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()));
          this.setDataValue('full_name', `${this.getDataValue('first_name') || ''} ${this.getDataValue('last_name') || ''}`);
        },
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(255),
        set(val) {
          this.setDataValue('last_name', val.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()));
          this.setDataValue('full_name', `${this.getDataValue('first_name') || ''} ${this.getDataValue('last_name') || ''}`);
        },
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING(255),
        get() {
          return `${this.first_name ? this.first_name : ''} ${this.last_name ? this.last_name : ''}`;
        },
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      role_id: {
        allowNull: false,
        defaultValue: ROLE_TYPES.CUSTOMER,
        type: Sequelize.BIGINT(20).UNSIGNED,
        comment: '1 => Admin 2 => Supplier 3 => Customer',
        references: { model: 'roles', key: 'id' }
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      birth_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      profile_image: {
        allowNull: true,
        type: Sequelize.STRING(500)
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      country_code: {
        allowNull: false,
        type: Sequelize.STRING(5),
        defaultValue: '91'
      },
      contact_no: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      alternative_country_code: {
        allowNull: true,
        type: Sequelize.STRING(5)
      },
      alternative_contact_no: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      language_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'languages', key: 'id' }
      },
      user_address_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'user_addresses', key: 'id' }
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
    await queryInterface.dropTable('users');
  }
};