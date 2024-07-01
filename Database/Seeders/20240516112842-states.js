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
      },
      {
        name: "Haryana",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Panjab",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Jammu And Kashmir",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Himachal Pradesh",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Uttrakhand",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Uttar Pradesh",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bihar",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "West Bengol",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "TamilNadu",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Maharashtra",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Karnataka",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Arudachal Pradesh",
        country_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("states", null, {});
  }
};
