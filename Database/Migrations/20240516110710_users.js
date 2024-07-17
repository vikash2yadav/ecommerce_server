'use strict';

/** @type {import('sequelize-cli').Migration} */
const {STATUS, ROLE} = require("../../Config/constant");

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
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      birth_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      profile_image: {
        allowNull: true,
        type: Sequelize.STRING(500)
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      contact_no: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      alternative_contact_no: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      role_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'roles', key: 'id' },
        defaultValue: ROLE?.CUSTOMER
      },
      language_id: {
        allowNull: false,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'languages', key: 'id' }
      },
      created_by: {
        allowNull: true,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'admins', key: 'id' }
      },
      updated_by: {
        allowNull: true,
        type: Sequelize.BIGINT(20).UNSIGNED,
        references: { model: 'admins', key: 'id' }
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