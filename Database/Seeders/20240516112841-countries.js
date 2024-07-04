'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("countries", [
      {
        name: "India",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Afghanistan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pakistan",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Nepal",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "China",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bangladesh",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Austrelia",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Argentina",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bermuda",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Brazil",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("countries", null, {});
  }
};
