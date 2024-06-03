'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("permissions", [
      {
        role_id: 1,
        module_id: 1,
        read: 1,
        write: 1,
        delete: 1
      },
      {
        role_id: 1,
        module_id: 2,
        read: 1,
        write: 1,
        delete: 1
      },
      {
        role_id: 1,
        module_id: 3,
        read: 1,
        write: 1,
        delete: 1
      },
      {
        role_id: 1,
        module_id: 4,
        read: 1,
        write: 1,
        delete: 1
      },
      {
        role_id: 2,
        module_id: 1,
        read: 1,
        write: 1,
        delete: 1
      },
      {
        role_id: 2,
        module_id: 2,
        read: 1,
        write: 1,
        delete: 1
      },
      {
        role_id: 2,
        module_id: 3,
        read: 1,
        write: 1,
        delete: 1
      },
      {
        role_id: 2,
        module_id: 4,
        read: 1,
        write: 1,
        delete: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("permissions", {}, null);
  }
};
