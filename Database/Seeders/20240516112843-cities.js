'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("cities", [
      {
        name: "Ahmedabad",
        state_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Vadodara",
        state_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("cities", null, {});
  }
};
