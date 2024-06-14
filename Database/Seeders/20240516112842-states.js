'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("states", [
      {
        name: "Gujarat",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Rajasthan",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("states", null, {});
  }
};
