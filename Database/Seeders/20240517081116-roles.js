'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [{
      name: "Super Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('roles', null, {});
  }
};
